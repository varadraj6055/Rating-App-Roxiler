const express = require('express');
const Store = require('../models/Store');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

// // Middleware to check if the user is admin
// const isowner = (req, res, next) => {
//     if (req.user && req.user.role === 'store_owner') {
    
//         next();
//     } else {
//         return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }
// };


router.get('/dashboard', authenticateUser, async (req, res) => {
    try {
        // Find stores owned by the currently authenticated owner
        // const stores = await Store.find({ owner: req.user._id }).populate('owner', 'name');

        const stores = await Store.find({ owner: req.user.id })
            .populate('ratings.userId', 'name email',) // Populate user info for ratings
            .exec();

        if (!stores.length) {
            return res.status(404).json({ message: 'No stores found for this owner.' });
        }

        let totalRatings = 0;
        const userRatingsList = [];

        // Process each store owned by the owner
        stores.forEach((store) => {
            totalRatings += store.ratings.length; // Count total ratings

            // For each store, push the user's rating to the userRatingsList
            store.ratings.forEach(rating => {
                userRatingsList.push({
                    userName: rating.userId.name,
                    userEmail: rating.userId.email,
                    storeName: store.name,
                    rating: rating.rating,
                    averageRating:store.averageRating,
                });
            });
        });

        // Respond with total ratings and user ratings list
        res.status(200).json({
            totalRatings,
            userRatingsList,
        });
    } catch (error) {
        console.error('Error fetching owner dashboard data:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;