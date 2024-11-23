// routes/userRouter.js
const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

// Create a new user (Admin only)
router.post('/', isAuthenticated, checkRole(['admin']), userController.createUser);

// Get all users (Admin only)
router.get('/', isAuthenticated, checkRole(['admin']), userController.getUsers);

// Get a specific user by userId (Admin or the user themselves)
router.get('/:userId', isAuthenticated, userController.getUserById);

// Update user details (Admin or the user themselves)
router.put('/:userId', isAuthenticated, userController.updateUser);

// Delete a user (Admin only)
router.delete('/:userId', isAuthenticated, checkRole(['admin']), userController.deleteUser);

module.exports = router;
