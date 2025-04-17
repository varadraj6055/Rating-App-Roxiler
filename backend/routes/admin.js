const express = require('express');
const User = require('../models/User');
const Store = require('../models/Store');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

// Middleware to check if the user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
// Get dashboard stats (only for admins)
router.get('/dashboard', authenticateUser, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStores = await Store.countDocuments();
      // Calculate total ratings by unwinding the ratings array
      const totalRatingsResult = await Store.aggregate([
        { $unwind: "$ratings" }, // Unwind the ratings array
        { $group: { _id: null, totalRatings: { $sum: 1 } } } // Sum the total number of ratings
    ]);

    // If aggregation returned a result, extract total ratings, otherwise default to 0
    const totalRatings = totalRatingsResult.length > 0 ? totalRatingsResult[0].totalRatings : 0;


        res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Add a new store (only admins)
router.post('/addstore', authenticateUser, isAdmin, async (req, res) => {
    const { name, address } = req.body;

    try {
        const newStore = new Store({ name, address });
        await newStore.save();
        res.status(201).json({ message: 'Store added successfully', store: newStore });
    } catch (error) {
        res.status(500).json({ message: 'Error adding store', error });
    }
});

// Add a new user (only admins)
router.post('/adduser', authenticateUser, isAdmin, async (req, res) => {
    const { name, email, password, address, role } = req.body;
    try {
        // Directly store the password without hashing
        const newUser = new User({ name, email, password, address, role });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});
module.exports = router;