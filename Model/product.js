const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  rentalDuration: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productImage: { type: String, required: true }, // Cloudinary image URL
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
