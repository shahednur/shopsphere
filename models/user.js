const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };