const express = require('express');
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware'); // Middleware to ensure user is authenticated
 
const router = express.Router();


router.post('/', authenticateUser, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (oldPassword !== user.password) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;