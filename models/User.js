const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false,
  },
});

// Hash password before saving
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Method to validate password
User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Middleware for role-based access
const authMiddleware = {
  // Authenticate user by verifying JWT token
  authenticate: async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add user details to request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  },

  // Authorize user based on role
  authorize: (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  },
};

module.exports = { User, authMiddleware };
