// API Service - Axios instance with production optimizations
import axios from 'axios';

// Create axios instance with base config
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 30000, // 30 second timeout for file uploads
    headers: {
        'Accept': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors
        if (!error.response) {
            return Promise.reject({
                message: 'Network error. Please check your connection.',
            });
        }

        // Handle timeout
        if (error.code === 'ECONNABORTED') {
            return Promise.reject({
                message: 'Request timeout. Please try again.',
            });
        }

        // Return error response
        return Promise.reject(error.response.data);
    }
);

// Submit registration form
export const submitRegistration = async (formData) => {
    try {
        // Create FormData for file upload
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === 'aadharPhoto' && formData[key]) {
                data.append('aadharPhoto', formData[key]);
            } else if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        });

        const response = await api.post('/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return {
            success: true,
            registrationId: response.data.registrationId,
            message: response.data.message,
        };

    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: error.message || 'Something went wrong',
        };
    }
};

// Get all registrations (for dashboard later)
export const getAllRegistrations = async () => {
    try {
        const response = await api.get('/registrations');
        return {
            success: true,
            data: response.data.data,
            count: response.data.count,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to fetch registrations',
        };
    }
};

// Get registration by ID
export const getRegistrationById = async (registrationId) => {
    try {
        const response = await api.get(`/registration/${registrationId}`);
        return {
            success: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Registration not found',
        };
    }
};

export default api;
