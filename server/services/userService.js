// services/userService.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Create a new user (Admin only)
const createUser = async (userId, username, password, role) => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  return await User.create({
    userId,
    username,
    password: hashedPassword,
    role
  });
};

// Get all users (Admin only)
const getUsers = async () => {
  return await User.findAll();
};

// Get a specific user by userId (Admin or the user themselves)
const getUserById = async (userId, currentUser) => {
  if (currentUser.role !== 'admin' && currentUser.userId !== userId) {
    throw new Error('Forbidden: You do not have permission to view this user');
  }

  const user = await User.findOne({ where: { userId } });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Update user details (Admin or the user themselves)
const updateUser = async (userId, username, password, role, currentUser) => {
  if (currentUser.role !== 'admin' && currentUser.userId !== userId) {
    throw new Error('Forbidden: You do not have permission to update this user');
  }

  const user = await User.findOne({ where: { userId } });
  if (!user) {
    throw new Error('User not found');
  }

  let updatedPassword = user.password;
  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  user.username = username || user.username;
  user.password = updatedPassword;
  user.role = role || user.role;

  await user.save();
  return user;
};

// Delete a user (Admin only)
const deleteUser = async (userId) => {
  const user = await models.User.findOne({ where: { userId } });

  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
