// Payment Routes - Razorpay payment endpoints with webhook
const express = require('express');
const router = express.Router();

// Import middleware
const { upload } = require('../middleware/upload');

// Import controller
const {
    createOrder,
    verifyPayment,
    handleWebhook,
    getPaymentStatus,
} = require('../controllers/payment');

// Routes
router.post('/create-order', createOrder);
router.post('/verify', upload.single('aadharPhoto'), verifyPayment);
router.post('/webhook', handleWebhook); // Razorpay webhook endpoint
router.get('/:orderId', getPaymentStatus);

module.exports = router;
