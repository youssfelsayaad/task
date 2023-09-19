// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
// Create a new product
router.post('/create-product', productController.createProduct)

// Retrieve a list of all products
.get('/products', productController.getAllProducts)

.get('/allProducts', productController.getAllProd)

// Retrieve a specific product by ID
.get('/products/:id', productController.getProductById)

// Retrieve a list of active products

.get('/active-products', productController.renderActiveProducts)

// Retrieve a list of inactive products

.get('/inactive-products', productController.renderInactiveProducts)


// Update a product
.put('/products/:id', productController.updateProduct)

// Delete a product
.delete('/products/:id', productController.deleteProduct)


// Search for products by name or barcode
.get('/products/search', productController.searchProducts)


module.exports = router;
