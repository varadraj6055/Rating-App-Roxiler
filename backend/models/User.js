const mongoose = require('mongoose');
// Validation regex for email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation regex for password
const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,16}$/;
// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [20, 'Name must be at least 20 characters'],
        maxlength: [60, 'Name must be less than 60 characters']
      },
     address: {
        type: String,
        required: [true, 'Address is required'],
        maxlength: [400, 'Address must be less than 400 characters']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: [emailRegex, 'Please enter a valid email address']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [16, 'Password must be less than 16 characters'],
        match: [passwordRegex, 'Password must contain at least one uppercase letter and one special character']
      },
    role: {
        type: String,
        enum: ['admin', 'user', 'store_owner'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);