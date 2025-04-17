
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


const { check, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    // Validation checks
    check('name')
      .isLength({ min: 20, max: 60 })
      .withMessage('Name must be between 20 and 60 characters.'),
    check('email')
      .isEmail()
      .withMessage('Please provide a valid email address.'),
    check('address')
      .isLength({ max: 400 })
      .withMessage('Address must not exceed 400 characters.'),
    check('password')
      .isLength({ min: 8, max: 16 })
      .withMessage('Password must be between 8 and 16 characters.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter.')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address ,role} = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      user = new User({ name, email, password, address,
        role });
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });
      res.status(201).json({ token, role: user.role });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
  }
);





// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare the plain-text password directly (no hashing)
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;