const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authMiddleware } = require('../models/User'); // Import authMiddleware for security
const router = express.Router();

// Public Route: Get all products (accessible by authenticated users)
router.get('/products', authMiddleware.authenticate, getProducts);

// Protected Route: Add a product (Admin only)
router.post(
  '/products',
  authMiddleware.authenticate,
  authMiddleware.authorize(['admin']),
  addProduct
);

// Protected Route: Update a product (Admin only)
router.put(
  '/products/:id',
  authMiddleware.authenticate,
  authMiddleware.authorize(['admin']),
  updateProduct
);

// Protected Route: Delete a product (Admin only)
router.delete(
  '/products/:id',
  authMiddleware.authenticate,
  authMiddleware.authorize(['admin']),
  deleteProduct
);

module.exports = router;
