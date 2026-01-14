// Cloudinary Configuration - Cloud image storage setup
const cloudinary = require('cloudinary').v2;

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

        // Log to verify credentials are loaded
        if (process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET) {
            console.log('Cloudinary Connected:', process.env.CLOUD_NAME);
        } else {
            console.error('Cloudinary Error: Missing credentials in .env file');
            console.log('CLOUD_NAME:', process.env.CLOUD_NAME || 'NOT SET');
            console.log('API_KEY:', process.env.API_KEY ? 'SET' : 'NOT SET');
            console.log('API_SECRET:', process.env.API_SECRET ? 'SET' : 'NOT SET');
        }
    } catch (error) {
        console.error('Cloudinary Connection Error:', error.message);
    }
};

module.exports = { cloudinaryConnect, cloudinary };
