// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const categoryRoutes = require('./routes/category');
const sliderRoutes = require('./routes/slider');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'admin/views'));

// Serve static files for Bootstrap and other assets
app.use(express.static(path.join(__dirname, 'admin/public')));

// Middleware for parsing incoming requests
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));



  // Admin Dashboard Route
  app.get('/dashboard', (req, res) => {
    res.render('layouts/main', {
      pageTitle: 'Admin Dashboard',
      body: '../pages/dashboard',
      stats: {
        users: 120,
        products: 45,
        orders: 30,
      },
    });
  });
  

// Product Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/sliders', sliderRoutes);
app.use('/brands', brandRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);


// Order Routes
app.get('/orders', (req, res) => {
  res.render('pages/orders/index', {
    layout: 'layouts/main',
    pageTitle: 'Orders',
  });
});


// Payment Routes
app.get('/payments', (req, res) => {
  res.render('pages/payments/index', {
    layout: 'layouts/main',
    pageTitle: 'Payments',
  });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
