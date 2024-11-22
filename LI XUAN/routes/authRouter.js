const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../models');  // Import models
const bcrypt = require('bcryptjs');

const router = express.Router();


// Route to handle user registration (create new user)
router.post('/register', async (req, res) => {
  const { userId, username, password, role } = req.body;  // Assuming these are the fields you're accepting

  try {
    // Check if the user already exists
    const existingUser = await models.User.findOne({ where: { userId } });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this ID already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create a new user with the hashed password
    const newUser = await models.User.create({
      userId,
      password: hashedPassword,
      username,  // assuming other fields like name and email are also being passed
      role
    });

    // Return success response
    res.status(201).json({
      message: 'User registered successfully!',
      userId: newUser.userId,  // you can send back other relevant data too
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error registering user',
      error: error.message
    });
  }
});
// This route handles the login and JWT generation
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;  // Assume userId and password are sent in the request body
  
  try {
    // Find the user by userId
    const user = await models.User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.userId, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message
    });
  }
});

module.exports = router;
