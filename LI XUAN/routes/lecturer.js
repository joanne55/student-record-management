const express = require('express');
// Import models
const models = require('../models');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Admin can GET all lecturers
router.get('/lecturer', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const lecturers = await models.Lecturer.findAll();
    res.json({
      message: 'Lecturer list retrieved successfully',
      data: lecturers
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving lecturers',
      error: error.message
    });
  }
});

// Admin can POST (add) a new lecturer and create the associated user at the same time
router.post('/lecturer', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id, username, password, fname, lname, address, contact, email, department } = req.body;

    // Check if user already exists
    const existingUser = await models.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Step 1: Create the User record for the lecturer
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await models.User.create({
      userId: id,         // Use the same ID for both User and Lecturer
      username: username,
      password: hashedPassword,
      role: 'lecturer'     // Set role to 'lecturer'
    });

    // Step 2: Create the Lecturer record using the same ID
    const newLecturer = await models.Lecturer.create({
      Lid: newUser.userId, // Link the Lecturer's ID to the User's ID (userId)
      Lfname: fname,
      Llname: lname,
      Laddress: address,
      Lcontact: contact,
      Lemail: email,
      Ldepartment: department
    });

    // Respond with success and the newly created user and lecturer data
    res.status(201).json({
      message: 'Lecturer and user added successfully',
      data: {
        user: newUser,    // Newly created user
        lecturer: newLecturer  // Newly created lecturer
      }
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      message: 'Error adding lecturer and user',
      error: error.message
    });
  }
});

// Admin can DELETE a lecturer (when they leave the institution)
router.delete('/:id', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const lecturer = await models.Lecturer.findByPk(id);

    if (!lecturer) {
      return res.status(404).json({
        message: 'Lecturer not found'
      });
    }

    // Delete the lecturer record
    await lecturer.destroy();

    // Optionally, delete the associated user record if the lecturer is deleted
    await models.User.destroy({ where: { userId: lecturer.Lid } });

    res.json({
      message: 'Lecturer and associated user deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting lecturer',
      error: error.message
    });
  }
});

module.exports = router;
