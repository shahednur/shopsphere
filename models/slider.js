const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: {type: String, required: true}, // URL for the slider image
    url: { type: String, required: false }, // Optional link for the slider
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = { Slider };
