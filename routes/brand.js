const express = require('express');
const { Brand } = require('../models/brand');

const router = express.Router();

// Route to display all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.render('layouts/main', {
      pageTitle: 'Brands',
      body: '../pages/brands/index',
      brands,
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the create brand form
router.get('/create', (req, res) => {
  res.render('layouts/main', {
    pageTitle: 'Create Brand',
    body: '../pages/brands/create',
  });
});

// Route to handle brand creation
router.post('/create', async (req, res) => {
  try {
    const { name, logo, description } = req.body;

    // Create a new brand
    const newBrand = new Brand({ name, logo, description });

    // Save the brand to the database
    await newBrand.save();

    res.redirect('/brands');
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the edit brand form
router.get('/edit/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).send('Brand not found');
    }

    res.render('layouts/main', {
      pageTitle: 'Edit Brand',
      body: '../pages/brands/edit',
      brand,
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle brand update
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, logo, description } = req.body;

    // Update the brand
    await Brand.findByIdAndUpdate(req.params.id, { name, logo, description });

    res.redirect('/brands');
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle brand deletion
router.post('/delete/:id', async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.redirect('/brands');
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
