// models/Product.js
const mongoose = require('mongoose');

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    unique: true, // Ensure barcodes are unique
    required: true,
  },
  description: {
    type: String,
  },
  priceBeforeDiscount: {
    type: Number,
    required: true,
  },
  priceAfterDiscount: {
    type: Number,
    default: null, // Assuming initially there's no discount
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // You can add more statuses if needed
    default: 'active', // Assuming products are active by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
