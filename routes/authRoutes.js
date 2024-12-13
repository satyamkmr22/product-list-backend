const express = require('express');
const router = express.Router();
const { User } = require('../models/User'); // Adjust the path as needed

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateToken();
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
