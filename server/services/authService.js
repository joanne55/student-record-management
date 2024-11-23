const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import Sequelize models

const registerUser = async (userId, username, password, role) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ where: { userId } });
  if (existingUser) {
    throw new Error('User with this ID already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await User.create({
    userId,
    username,
    password: hashedPassword,
    role,
  });

  return newUser;
};

const loginUser = async (userId, password) => {
  // Find the user
  const user = await User.findOne({ where: { userId } });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid password');
    error.status = 401;
    throw error;
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.userId, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

  return {token, role: user.role};
};

module.exports = {
  registerUser,
  loginUser,
};
