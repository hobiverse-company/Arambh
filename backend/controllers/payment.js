// Payment Controller - Handles Razorpay payment flow with Webhook support
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const PendingRegistration = require('../models/PendingRegistration');
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

// Helper: Process registration (used by both verify and webhook)
const processRegistration = async (orderId, paymentId, signature, formData, aadharPhotoBase64) => {
    // Check if already processed (prevent duplicates)
    const existingPayment = await Payment.findOne({ orderId });
    if (existingPayment) {
        console.log('⚠️ Order already processed:', orderId);
        return { alreadyProcessed: true, registrationId: existingPayment.registrationId };
    }

    // Create Payment entry
    const payment = new Payment({
        orderId,
        paymentId,
        signature,
        amount: parseInt(formData.amount) || 100,
        name: formData.name,
        email: formData.email,
        mobileNo: formData.mobileNo,
        sportId: formData.sportId,
        sportName: formData.sportName,
        status: 'paid',
        registrationId: null,
    });
    await payment.save();
    console.log('✅ Payment entry created:', payment._id);

    // Create Registration entry
    const registrationId = generateRegistrationId(formData.sportId);
    const registration = new Registration({
        name: formData.name,
        universityName: formData.universityName,
        branch: formData.branch,
        teamName: formData.teamName || null,
        mobileNo: formData.mobileNo,
        email: formData.email,
        aadharNo: formData.aadharNo,
        aadharPhotoPath: 'pending',
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

    // Link Payment to Registration
    payment.registrationId = registration._id;
    await payment.save();

    // Upload photo to Cloudinary from base64
    if (aadharPhotoBase64) {
        try {
            // Convert base64 to buffer
            const base64Data = aadharPhotoBase64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const cloudinaryResult = await uploadToCloudinary(buffer);
            registration.aadharPhotoPath = cloudinaryResult.secure_url;
            await registration.save();
            console.log('✅ Cloudinary upload success:', cloudinaryResult.secure_url);
        } catch (uploadError) {
            console.error('⚠️ Cloudinary upload failed:', uploadError.message);
        }
    }

    // Send confirmation email
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

    return { alreadyProcessed: false, registrationId: registration.registrationId };
};

// POST /api/payment/create-order - Create Razorpay order and save pending data
const createOrder = async (req, res) => {
    try {
        const instance = getRazorpayInstance();
        if (!instance) {
            return res.status(500).json({
                success: false,
                message: 'Payments are not configured on the server.',
            });
        }

        const {
            amount, name, email, mobileNo, sportId, sportName, aadharNo,
            universityName, branch, teamName, sportCategory, sportCategoryId,
            sportType, teamSize, aadharPhotoBase64
        } = req.body;

        // Validate required fields
        if (!amount || !name || !email || !mobileNo || !sportId || !sportName || !aadharNo) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: { sportId, sportName, name, email, mobileNo, aadharNo, amount },
        };

        const order = await instance.orders.create(options);
        console.log('✅ Razorpay order created:', order.id);

        // Save pending registration data (for webhook to use later)
        const pendingReg = new PendingRegistration({
            orderId: order.id,
            formData: {
                name, universityName, branch, teamName, mobileNo, email, aadharNo,
                sportCategory, sportCategoryId, sportName, sportId, sportType,
                teamSize: parseInt(teamSize) || 1,
                amount: parseInt(amount),
            },
            aadharPhotoBase64: aadharPhotoBase64 || '',
            status: 'pending',
        });
        await pendingReg.save();
        console.log('✅ Pending registration saved for order:', order.id);

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

// POST /api/payment/verify - Verify payment (frontend callback - backup for webhook)
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

        // Verify Razorpay signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', razorpaySecret)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            console.error('Signature mismatch for order:', razorpay_order_id);
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed - invalid signature',
            });
        }

        console.log('✅ Signature verified for order:', razorpay_order_id);

        // Check if already processed by webhook
        const existingPayment = await Payment.findOne({ orderId: razorpay_order_id });
        if (existingPayment) {
            console.log('✅ Already processed by webhook, returning success');
            const registration = await Registration.findById(existingPayment.registrationId);
            return res.status(200).json({
                success: true,
                message: 'Payment successful! Registration completed.',
                registrationId: registration?.registrationId || 'PROCESSED',
            });
        }

        // Get pending registration data
        const pendingReg = await PendingRegistration.findOne({ orderId: razorpay_order_id });
        let aadharPhotoBase64 = pendingReg?.aadharPhotoBase64 || '';

        // If photo sent in this request (file upload), convert to base64
        if (req.file) {
            aadharPhotoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        // Process registration
        const result = await processRegistration(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            formData,
            aadharPhotoBase64
        );

        // Mark pending as completed
        if (pendingReg) {
            pendingReg.status = 'completed';
            await pendingReg.save();
        }

        res.status(200).json({
            success: true,
            message: 'Payment successful! Registration completed.',
            registrationId: result.registrationId,
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed. Please contact support.',
        });
    }
};

// POST /api/payment/webhook - Razorpay webhook (browser-independent)
const handleWebhook = async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_SECRET;

        // Verify webhook signature
        const signature = req.headers['x-razorpay-signature'];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            console.error('❌ Webhook signature mismatch');
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        const event = req.body.event;
        const payload = req.body.payload;

        console.log('📩 Webhook received:', event);

        // Handle payment.captured event
        if (event === 'payment.captured') {
            const paymentEntity = payload.payment.entity;
            const orderId = paymentEntity.order_id;
            const paymentId = paymentEntity.id;

            console.log('💰 Payment captured for order:', orderId);

            // Check if already processed
            const existingPayment = await Payment.findOne({ orderId });
            if (existingPayment) {
                console.log('⚠️ Already processed, skipping');
                return res.status(200).json({ success: true, message: 'Already processed' });
            }

            // Get pending registration data
            const pendingReg = await PendingRegistration.findOne({ orderId });
            if (!pendingReg) {
                console.error('❌ No pending registration found for order:', orderId);
                return res.status(404).json({ success: false, message: 'Pending registration not found' });
            }

            // Process registration using saved data
            await processRegistration(
                orderId,
                paymentId,
                '', // No signature from webhook
                pendingReg.formData,
                pendingReg.aadharPhotoBase64
            );

            // Mark as completed
            pendingReg.status = 'completed';
            await pendingReg.save();

            console.log('✅ Webhook processing complete for order:', orderId);
        }

        // Always return 200 to Razorpay (acknowledge receipt)
        res.status(200).json({ success: true, message: 'Webhook processed' });

    } catch (error) {
        console.error('Webhook error:', error);
        // Still return 200 to prevent Razorpay from retrying
        res.status(200).json({ success: false, message: 'Webhook processing failed' });
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

module.exports = { createOrder, verifyPayment, handleWebhook, getPaymentStatus };
