const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: Number, required: true },
    images: [String], // Array of image URLs
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
        rating: { type: Number, required: true },
        comment: String,
      },
    ],
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // References to other products
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }, // Reference to Brand model
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
