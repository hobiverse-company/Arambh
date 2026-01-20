// PendingRegistration Model - Stores form data before payment for webhook processing
const mongoose = require('mongoose');

const pendingRegistrationSchema = new mongoose.Schema({
    // Razorpay Order ID - links this to payment
    orderId: {
        type: String,
        required: true,
        unique: true,
    },

    // All form data stored as JSON
    formData: {
        name: { type: String, required: true },
        universityName: { type: String, required: true },
        branch: { type: String, required: true },
        teamName: { type: String, default: null },
        mobileNo: { type: String, required: true },
        email: { type: String, required: true },
        aadharNo: { type: String, required: true },
        sportCategory: { type: String, required: true },
        sportCategoryId: { type: String, required: true },
        sportName: { type: String, required: true },
        sportId: { type: String, required: true },
        sportType: { type: String, required: true },
        teamSize: { type: Number, default: 1 },
        amount: { type: Number, required: true },
    },

    // Aadhar photo stored as base64 (temporary, deleted after processing)
    aadharPhotoBase64: {
        type: String,
        required: true,
    },

    // Processing status
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },

    // Auto-expire after 24 hours (cleanup old pending records)
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        index: { expires: 0 }, // TTL index
    },

}, {
    timestamps: true,
});

// Index for fast lookup by orderId
pendingRegistrationSchema.index({ orderId: 1 });
pendingRegistrationSchema.index({ status: 1 });

const PendingRegistration = mongoose.model('PendingRegistration', pendingRegistrationSchema);

module.exports = PendingRegistration;
