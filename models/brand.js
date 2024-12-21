const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: String, // Optional logo URL
    description: String, // Optional brand description
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = { Brand };
