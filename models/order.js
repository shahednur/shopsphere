const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentDetails: {
      cardNumber: String,
      expiryDate: String,
      nameOnCard: String,
    },
    orderStatus: { type: String, default: 'Processing' },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order };
