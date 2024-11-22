const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const { isAuthenticated, checkRole } = require('../middleware/auth'); // Authentication middleware
const models = require('../models');  // Sequelize models (User model)
const router = express.Router();

// Create a new user (Admin only)
router.post('/user', isAuthenticated, checkRole(['admin']), async (req, res) => {
    try {
        const { userId, username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await models.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await models.User.create({
            userId,
            username,
            password: hashedPassword,
            role
        });

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
});

// Get all users (Admin only)
router.get('/users', isAuthenticated, checkRole(['admin']), async (req, res) => {
    try {
        const users = await models.User.findAll();
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
});

// Get a specific user by userId (Admin or the user themselves)
router.get('/user/:userId', isAuthenticated, async (req, res) => {
    const { userId } = req.params;

    // Only allow the admin or the user themselves to access their data
    if (req.user.role !== 'admin' && req.user.userId !== userId) {
        return res.status(403).json({
            message: 'Forbidden: You do not have permission to view this user'
        });
    }

    try {
        const user = await models.User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
});

// Update user details (Admin or the user themselves)
router.put('/user/:userId', isAuthenticated, async (req, res) => {
    const { userId } = req.params;
    const { username, password, role } = req.body;

    // Only allow the admin or the user themselves to update their data
    if (req.user.role !== 'admin' && req.user.userId !== userId) {
        return res.status(403).json({
            message: 'Forbidden: You do not have permission to update this user'
        });
    }

    try {
        const user = await models.User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password if it's provided
        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user
        user.username = username || user.username;
        user.password = updatedPassword;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

// Delete a user (Admin only)
router.delete('/user/:userId', isAuthenticated, checkRole(['admin']), async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await models.User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});

module.exports = router;
