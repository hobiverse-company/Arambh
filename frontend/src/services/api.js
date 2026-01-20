// API Service - Axios with Razorpay payment integration
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance with base config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 45000,
    headers: {
        'Accept': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject({ message: 'Network error. Please check your connection.' });
        }
        if (error.code === 'ECONNABORTED') {
            return Promise.reject({ message: 'Request timeout. Please try again.' });
        }
        return Promise.reject(error.response.data);
    }
);

// Create Razorpay order (now saves form data for webhook)
export const createPaymentOrder = async (orderData) => {
    try {
        const response = await api.post('/payment/create-order', orderData);
        return {
            success: true,
            order: response.data.order,
            key: response.data.key,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to create payment order',
        };
    }
};

// Convert file to base64
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Verify payment and complete registration (with retry for UPI return)
export const verifyPaymentAndRegister = async (paymentData, formData, aadharPhoto, retryCount = 0) => {
    try {
        const data = new FormData();

        // Add payment data
        data.append('razorpay_order_id', paymentData.razorpay_order_id);
        data.append('razorpay_payment_id', paymentData.razorpay_payment_id);
        data.append('razorpay_signature', paymentData.razorpay_signature);

        // Add form data as JSON
        data.append('formData', JSON.stringify(formData));

        // Add Aadhar photo
        if (aadharPhoto) {
            data.append('aadharPhoto', aadharPhoto);
        }

        const response = await api.post('/payment/verify', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 90000, // 90 seconds for verify (longer for UPI return)
        });

        return {
            success: true,
            message: response.data.message,
            registrationId: response.data.registrationId,
        };
    } catch (error) {
        // Retry once if network error (common after UPI app return)
        if (retryCount < 1 && (!error.response || error.message?.includes('Network'))) {
            console.log('Retrying verify request...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 sec
            return verifyPaymentAndRegister(paymentData, formData, aadharPhoto, retryCount + 1);
        }
        return {
            success: false,
            error: error.message || 'Payment verification failed',
        };
    }
};

// Load Razorpay script
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Get all registrations (for dashboard)
export const getAllRegistrations = async () => {
    try {
        const response = await api.get('/registrations');
        return { success: true, data: response.data.data, count: response.data.count };
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch registrations' };
    }
};

// Warm up backend server
export const warmupBackend = async () => {
    try {
        // Call health endpoint to wake up the server

        const baseUrl = String(api.defaults.baseURL || '').replace(/\/+$/, '');
        await fetch(`${baseUrl}/health`, { method: 'GET' });
        console.log('Backend warm-up initiated');
    } catch (error) {
        // Silently fail - this is just a warm-up call
        console.log('Backend warm-up call sent');
    }
};

// Visit counter
export const getVisitCount = async () => {
    try {
        const response = await api.get('/visits');
        return { success: true, count: response.data.count };
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch visit count' };
    }
};

export const incrementVisitCount = async () => {
    try {
        const response = await api.post('/visits');
        return { success: true, count: response.data.count };
    } catch (error) {
        return { success: false, error: error.message || 'Failed to update visit count' };
    }
};

export default api;
