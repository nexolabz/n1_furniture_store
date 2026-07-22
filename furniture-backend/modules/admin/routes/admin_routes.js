const express = require("express");
const adminRouter = express.Router();
const multer = require("multer");
const { verifyToken, authorizeRoles } = require("../../../middleware/authMiddleware");
const {
  createProduct,
  getAdminProducts,
  getAdminProductById
} = require("../controllers/adminProductController");

// Setup Multer for in-memory file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit files to 5MB
  }
});

// Define expected file upload fields:
// - 'image_url' or 'image' for the primary product image
// - 'images' for up to 5 additional gallery images
const uploadMiddleware = upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 }
]);

// Admin product routes
adminRouter.post('/products', verifyToken, authorizeRoles('SUPER_ADMIN', 'STORE_OWNER'), uploadMiddleware, createProduct);
adminRouter.get('/products', verifyToken, authorizeRoles('SUPER_ADMIN', 'STORE_OWNER'), getAdminProducts);
adminRouter.get('/products/:id', verifyToken, authorizeRoles('SUPER_ADMIN', 'STORE_OWNER'), getAdminProductById);

module.exports = adminRouter;
