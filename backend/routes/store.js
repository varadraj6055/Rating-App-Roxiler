const express = require('express');
const Store = require('../models/Store');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Add new store (Admin only)
router.post('/add-store', authenticateUser, async (req, res) => {
  try {
    const { name, address } = req.body;
    const owner = req.user.id; 
   // Assuming authenticateUser middleware adds user info to req

    if (!name || !address || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const store = new Store({ name, address, owner });
    await store.save();

    res.status(201).json(store);
  } catch (error) {
    console.error('Error adding store:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', authenticateUser, async (req, res) => {
  try {
    // Fetch all stores and populate the owner's details from the User model
    const stores = await Store.find().populate('owner', 'name email'); // Only populates 'name' and 'email' fields of owner
    
    res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Server error, unable to fetch stores.' });
  }
});

router.post('/:id/rate', authenticateUser, async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Find the store by its ID
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if the user has already rated this store
    const existingRatingIndex = store.ratings.findIndex(r => r.userId.toString() === userId);

    if (existingRatingIndex >= 0) {
      // Update the existing rating
      store.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating entry for this user
      store.ratings.push({ userId, rating });
    }

    // Recalculate the average rating using the store method
    store.averageRating = store.getAverageRating();

    // Save the store with the updated ratings
    await store.save();

    res.status(200).json({
      message: 'Rating submitted successfully',
      userRating: rating,
      averageRating: store.averageRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting rating' });
  }
});

router.get('/:id/rating', authenticateUser, async (req, res) => {
  const storeId = req.params.id;
  const userId = req.user.id;

  try {
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Find the rating by the current user for this store
    const userRating = store.ratings.find(r => r.userId.toString() === userId);

    res.status(200).json({
      store: store,                 // Send the store details
      userRating: userRating ? userRating.rating : 'NA', // Send the user's rating if exists, otherwise 'NA'
      averageRating: store.getAverageRating(), // Send the average rating
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching store data' });
  }
});



module.exports = router;