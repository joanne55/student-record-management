const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated, checkRole } = require('../middleware/auth');

// Admin: View all students
router.get('/',  isAuthenticated, checkRole(['admin']), studentController.getAllStudents);

// Admin: Add a new student
router.post('/', isAuthenticated, checkRole(['admin']), studentController.addStudent);

// Student: Update personal details
router.put('/update', isAuthenticated, checkRole(['admin','student']), studentController.updateStudentDetails);

// Admin: Delete a student
router.delete('/:id', isAuthenticated, checkRole(['admin']),studentController.deleteStudent);

module.exports = router;
