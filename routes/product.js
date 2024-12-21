const express = require('express');
const { Product } = require('../models/product');
const { Brand } = require('../models/brand');
const { Category } = require('../models/category');

const router = express.Router();

// Route to display all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('brand relatedProducts');
    res.render('layouts/main', {
      pageTitle: 'Products',
      body: '../pages/products/index',
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the create product form
router.get('/create', async (req, res) => {
  try {
    const brands = await Brand.find();
    const product = await Product.find();
    const categories = await Category.find();
    res.render('layouts/main', {
      pageTitle: 'Create Product',
      body: '../pages/products/create',
      brands,
      product,
      categories
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle product creation
router.post('/create', async (req, res) => {
  try {
    const { name, description, price, category, stock, images, brand } = req.body;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: images.split(','), // Split comma-separated image URLs
      brand,
    });

    // Save the product to the database
    await newProduct.save();

    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the edit product form
router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('brand');
    const brands = await Brand.find();
    const categories = await Category.find();

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('layouts/main', {
      pageTitle: 'Edit Product',
      body: '../pages/products/edit',
      product,
      brands,
      categories,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle product update
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, description, price, category, stock, images, brand } = req.body;

    // Update the product
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      category,
      stock,
      images: images.split(','),
      brand,
    });

    res.redirect('/products');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle product deletion
router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API Route to fetch all products
router.get('/api', async (req, res) => {
    try {
      // Fetch all products, populate 'category', 'brand', and 'relatedProducts'
      const products = await Product.find()
        .populate('category', 'name') // Fetch only 'name' field from Category
        .populate('brand', 'name')   // Fetch only 'name' field from Brand
        .populate('relatedProducts', 'name price'); // Fetch specific fields from related products
  
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
      });
    }
  });

  // API Route to fetch a single product by ID
router.get('/api/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('relatedProducts', 'name price');
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product',
      });
    }
  });
  
  

module.exports = router;
