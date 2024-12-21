// Import required modules
const express = require('express');
const { Category } = require('../models/category');

// Initialize router
const router = express.Router();

// Route to display the categories list
router.get('/', async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    // Render the categories list page
    res.render('layouts/main', {
      pageTitle: 'Categories',
      body: '../pages/categories/index',
      categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the create category form
router.get('/create', (req, res) => {
  res.render('layouts/main', {
    pageTitle: 'Create Category',
    body: '../pages/categories/create',
  });
});

// Route to handle category creation
router.post('/create', async (req, res) => {
    try {
      const { name, description, icon } = req.body;
  
      // Create a new category
      const newCategory = new Category({
        name,
        description,
        icon,
      });
  
      // Save the category to the database
      await newCategory.save();
  
      // Redirect to the categories list page
      res.redirect('/categories');
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Route to display the edit category form
router.get('/edit/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.render('layouts/main', {
      pageTitle: 'Edit Category',
      body: '../pages/categories/edit',
      category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle category update
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    // Update the category
    await Category.findByIdAndUpdate(req.params.id, {
      name,
      description,
      icon,
    });

    // Redirect to the categories list page
    res.redirect('/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle category deletion
router.post('/delete/:id', async (req, res) => {
  try {
    // Delete the category
    await Category.findByIdAndDelete(req.params.id);

    // Redirect to the categories list page
    res.redirect('/categories');
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
