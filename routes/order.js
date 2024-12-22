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

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // Fetch only user name and email
      .populate({
        path: 'products.product', // Fetch only product names
        select: 'name',
      })
      .select('user products shippingAddress totalAmount orderStatus createdAt'); // Fetch only required fields

    res.render('layouts/main', {
      pageTitle: 'Orders',
      body: '../pages/orders/index',
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
