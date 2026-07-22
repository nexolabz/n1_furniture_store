const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = (buffer, folder = 'furniture_products') => {
  return new Promise((resolve, reject) => {
    // Check if Cloudinary credentials are set. If not, log a warning and return a mock URL.
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.warn("Cloudinary environment variables are missing! Returning a mock response for development.");
      return resolve({
        secure_url: `https://res.cloudinary.com/demo/image/upload/sample.jpg`,
        public_id: `mock_id_${Date.now()}`
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(uploadStream);
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary
};
