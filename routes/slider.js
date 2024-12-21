const express = require('express');
const { Slider } = require('../models/slider');

const router = express.Router();

// Route to display all sliders
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.render('layouts/main', {
      pageTitle: 'Sliders',
      body: '../pages/sliders/index',
      sliders,
    });
  } catch (error) {
    console.error('Error fetching sliders:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the create slider form
router.get('/create', (req, res) => {
  res.render('layouts/main', {
    pageTitle: 'Create Slider',
    body: '../pages/sliders/create',
  });
});

// Route to handle slider creation
router.post('/create', async (req, res) => {
  try {
    const { title, description, image, url, buttonText } = req.body;

    // Create a new slider
    const newSlider = new Slider({ title, description, image, url,buttonText });

    // Save the slider to the database
    await newSlider.save();

    res.redirect('/sliders');
  } catch (error) {
    console.error('Error creating slider:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the edit slider form
router.get('/edit/:id', async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).send('Slider not found');
    }

    res.render('layouts/main', {
      pageTitle: 'Edit Slider',
      body: '../pages/sliders/edit',
      slider,
    });
  } catch (error) {
    console.error('Error fetching slider:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle slider update
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, description, image, url, buttonText } = req.body;

    // Update the slider
    await Slider.findByIdAndUpdate(req.params.id, { title, description, image, url, buttonText });

    res.redirect('/sliders');
  } catch (error) {
    console.error('Error updating slider:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle slider deletion
router.post('/delete/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.redirect('/sliders');
  } catch (error) {
    console.error('Error deleting slider:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
