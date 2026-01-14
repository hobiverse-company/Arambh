// File Upload Middleware - Uses Cloudinary for cloud storage
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');

// Multer memory storage (stores file in memory buffer, not disk)
const storage = multer.memoryStorage();

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, PNG, and WEBP images are allowed'), false);
    }
};

// Multer upload configuration (memory storage)
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB max file size
    },
});

// Upload to Cloudinary helper function
const uploadToCloudinary = async (fileBuffer, folder = 'aadhar_photos') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'image',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                transformation: [
                    { width: 800, height: 600, crop: 'limit' }, // Resize if too large
                    { quality: 'auto' }, // Auto optimize quality
                ],
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = { upload, uploadToCloudinary };
