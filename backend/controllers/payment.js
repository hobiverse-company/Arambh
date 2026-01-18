// Payment Controller - Handles Razorpay payment flow
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const { getRazorpayInstance } = require('../config/razorpay');
const { uploadToCloudinary } = require('../middleware/upload');
const { sendRegistrationEmail } = require('../config/resend');

// Generate unique registration ID
const generateRegistrationId = (sportId) => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const sportCode = sportId.substring(0, 4).toUpperCase();
    return `ARMBH-${sportCode}-${timestamp}-${random}`;
};

// POST /api/payment/create-order - Create Razorpay order (NO DB entry here)
const createOrder = async (req, res) => {
    try {
        const instance = getRazorpayInstance();
        if (!instance) {
            return res.status(500).json({
                success: false,
                message: 'Payments are not configured on the server.',
            });
        }

        const { amount, name, email, mobileNo, sportId, sportName, aadharNo } = req.body;

        // Validate required fields only
        if (!amount || !name || !email || !mobileNo || !sportId || !sportName || !aadharNo) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // NO AADHAR/EMAIL VALIDATION - Allow multiple registrations

        // Create Razorpay order (NO DB entry here - only after successful payment)
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: { sportId, sportName, name, email, mobileNo, aadharNo, amount },
        };

        const order = await instance.orders.create(options);

        // DON'T save payment here - only after successful verification

        res.status(201).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
            },
            key: process.env.RAZORPAY_KEY || process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
        });
    }
};

// POST /api/payment/verify - Verify payment and complete registration
const verifyPayment = async (req, res) => {
    try {
        const razorpaySecret = process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET;
        if (!razorpaySecret) {
            return res.status(500).json({
                success: false,
                message: 'Payments are not configured on the server.',
            });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Parse formData safely
        let formData;
        try {
            formData = JSON.parse(req.body.formData);
        } catch (parseError) {
            console.error('FormData parse error:', parseError);
            return res.status(400).json({
                success: false,
                message: 'Invalid form data received',
            });
        }

        // Verify Razorpay signature (confirms payment is authentic)
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', razorpaySecret)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            console.error('Signature mismatch for order:', razorpay_order_id);
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed - invalid signature',
            });
        }

        console.log('✅ Signature verified for order:', razorpay_order_id);

        // STEP 1: Create Payment entry FIRST (money is already deducted)
        const payment = new Payment({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: parseInt(formData.amount) || formData.fee || 100,
            name: formData.name,
            email: formData.email,
            mobileNo: formData.mobileNo,
            sportId: formData.sportId,
            sportName: formData.sportName,
            status: 'paid',
            registrationId: null, // Will update after registration
        });
        await payment.save();
        console.log('✅ Payment entry created:', payment._id);

        // STEP 2: Create Registration entry (without photo initially)
        const registrationId = generateRegistrationId(formData.sportId);

        const registration = new Registration({
            name: formData.name,
            universityName: formData.universityName,
            branch: formData.branch,
            teamName: formData.teamName || null,
            mobileNo: formData.mobileNo,
            email: formData.email,
            aadharNo: formData.aadharNo,
            aadharPhotoPath: 'pending', // Temporary value, will update after upload
            sportCategory: formData.sportCategory,
            sportCategoryId: formData.sportCategoryId,
            sportName: formData.sportName,
            sportId: formData.sportId,
            sportType: formData.sportType,
            teamSize: parseInt(formData.teamSize) || 1,
            registrationId,
        });
        await registration.save();
        console.log('✅ Registration entry created:', registration._id);

        // STEP 3: Link Payment to Registration
        payment.registrationId = registration._id;
        await payment.save();

        // STEP 4: Upload photo to Cloudinary (if fails, entries still exist)
        let aadharPhotoPath = 'pending';
        if (req.file) {
            try {
                const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                aadharPhotoPath = cloudinaryResult.secure_url;
                console.log('✅ Cloudinary upload success:', aadharPhotoPath);

                // Update registration with actual photo URL
                registration.aadharPhotoPath = aadharPhotoPath;
                await registration.save();
            } catch (uploadError) {
                console.error('⚠️ Cloudinary upload failed (entries saved):', uploadError.message);
                // Don't throw - entries are already saved, admin can fix photo later
            }
        } else {
            console.warn('⚠️ No file received in request');
        }

        // STEP 5: Send confirmation email
        sendRegistrationEmail({
            name: formData.name,
            email: formData.email,
            sportName: formData.sportName,
            sportType: formData.sportType,
            teamName: formData.teamName,
            universityName: formData.universityName,
            registrationId: registration.registrationId,
            amount: payment.amount,
        }).catch(err => console.error('Email error:', err));

        res.status(200).json({
            success: true,
            message: 'Payment successful! Registration completed.',
            registrationId: registration.registrationId,
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed. Please contact support.',
        });
    }
};

// GET /api/payment/:orderId - Get payment status
const getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId })
            .select('-signature');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found',
            });
        }

        res.json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment status',
        });
    }
};

module.exports = { createOrder, verifyPayment, getPaymentStatus };
