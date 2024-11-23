// controllers/userController.js
const userService = require('../services/userService');

// Create a new user (Admin only)
const createUser = async (req, res) => {
  try {
    const { userId, username, password, role } = req.body;
    const newUser = await userService.createUser(userId, username, password, role);
    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Get all users (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving users',
      error: error.message
    });
  }
};

// Get a specific user by userId (Admin or the user themselves)
const getUserById = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await userService.getUserById(userId, req.user);
    res.status(200).json({
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user',
      error: error.message
    });
  }
};

// Update user details (Admin or the user themselves)
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, password, role } = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, username, password, role, req.user);
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await userService.deleteUser(userId);
    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
