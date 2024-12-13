const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/sequelize'); // Adjust path as necessary
const bcrypt = require('bcrypt');

// Define User model directly (avoiding re-importing)
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

async function createAdmin() {
  try {
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'admin123', // Password will be hashed automatically
        role: 'admin',
      });
      console.log('Admin user created: username: admin, password: admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit(); // Exit script after execution
  }
}

createAdmin();
