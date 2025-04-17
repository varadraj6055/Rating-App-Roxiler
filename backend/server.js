const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
require('dotenv').config();
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_CONNECTION_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Import Routes
const authRoutes = require('./routes/auth.js');
const storeRoutes = require('./routes/store.js');
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/users.js');
const passRoutes = require('./routes/changepass.js');
const ownerRoutes = require('./routes/owner.js');
// // Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/changepass', passRoutes);
app.use('/api/owner', ownerRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});