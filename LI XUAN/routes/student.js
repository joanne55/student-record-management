const express = require('express');
const bcrypt = require('bcryptjs');  // Import bcryptjs for hashing passwords
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const router = express.Router();

// Import models
const models = require('../models');

// Import authentication middlewares
const { isAuthenticated, checkRole } = require('../middleware/auth');

// Admin can view all students
// Admin can GET all lecturers
router.get('/student', isAuthenticated, checkRole(['admin']), async (req, res) => {
    try {
      const students = await models.Student.findAll();
      res.json({
        message: 'Student list retrieved successfully',
        data: students
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving students',
        error: error.message
      });
    }
}),



  // Admin can POST (add) a new lecturer and create the associated user at the same time
router.post('/student', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id, username, password, fname, lname, address, contact, dob, email } = req.body;

    // Check if user already exists
    const existingUser = await models.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Step 1: Create the User record for the  Student
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await models.User.create({
      userId: id,         // Use the same ID for both User and Student
      username: username,
      password: hashedPassword,
      role: 'student'     // Set role to 'lecturer'
    });

    // Step 2: Create the Student record using the same ID
      // Create the lecturer record after the user is created
      const newStudent = await models.Student.create({
        Sid: newUser.userId,  // This links the student to the User model via userId
        Sfname: fname,
        Slname: lname,
        Saddress: address,
        Scontact: contact,
        Semail: email,
       Sdob:dob
      });
  

    // Respond with success and the newly created user and lecturer data
    res.status(201).json({
      message: 'Lecturer and user added successfully',
      data: {
        user: newUser,    // Newly created user
        lecturer: newStudent // Newly created lecturer
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

// Students can update their personal details (address, contact, and email)
router.put('/student/update', isAuthenticated, checkRole(['student']), async (req, res) => {
  try {
    const studentId = req.user.userId; // Extract the student ID from the JWT payload (req.user)

    // Validate that the required fields are provided and valid
    const { Saddress, Scontact, Semail } = req.body;

    // Check if all the fields are provided
    if (!Saddress && !Scontact && !Semail) {
      return res.status(400).json({ message: 'At least one field (address, contact, or email) must be provided' });
    }

    // Validate that contact number is 8 digits (for Singapore)
    if (Scontact && (Scontact.toString().length !== 8 || isNaN(Scontact))) {
      return res.status(400).json({ message: 'Contact number must be exactly 8 digits' });
    }

    // Validate email format
    if (Semail && !/\S+@\S+\.\S+/.test(Semail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find the student by studentId (which corresponds to the userId)
    const student = await models.Student.findOne({
      where: { Sid: studentId }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the student record with the provided data
    const updatedStudent = await student.update({
      Saddress: Saddress || student.Saddress,  // Only update the fields that are provided
      Scontact: Scontact || student.Scontact,
      Semail: Semail || student.Semail
    });

    res.json({
      message: 'Student details updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating student details',
      error: error.message
    });
  }
});
  
  // Admin can DELETE a student (when they graduated)
  router.delete('/:id', isAuthenticated, checkRole(['admin']), async (req, res) => {
    try {
      const { id } = req.params;
      const student = await models.Student.findByPk(id);
  
      if (!student) {
        return res.status(404).json({
          message: 'Student not found'
        });
      }
  
      // Delete the lecturer record
      await student.destroy();
  
      // Optionally, delete the associated user record if the lecturer is deleted
      await models.User.destroy({ where: { userId: student.Sid } });
  
      res.json({
        message: 'Student and associated user deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting student',
        error: error.message
      });
    
}
});



module.exports = router;
