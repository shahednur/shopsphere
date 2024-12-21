const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
