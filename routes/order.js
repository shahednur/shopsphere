const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');

// Create an order
router.post('/create', async (req, res) => {
  try {
    const { user, products, shippingAddress, paymentDetails, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      products,
      shippingAddress,
      paymentDetails,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
    });
  }
});

module.exports = router;
