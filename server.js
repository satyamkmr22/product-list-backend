const express = require('express'); // Importing the express framework
const cors = require('cors'); // Importing the cors middleware
const bodyParser = require('body-parser'); // For parsing JSON requests
const productRoutes = require('./routes/productRoutes'); // Product routes
const authRoutes = require('./routes/authRoutes'); // Auth routes
const { authMiddleware } = require('./models/User'); // Middleware for JWT authentication
const sequelize = require('./config/sequelize'); // Sequelize instance
require('dotenv').config(); // Load environment variables

const app = express(); // Initialize express

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Product Management API');
});

// Auth Routes
app.use('/auth', authRoutes); // Routes for registration and login

// Protected Product Routes (Require JWT Authentication)
app.use('/products', authMiddleware.authenticate, productRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


module.exports = app;
