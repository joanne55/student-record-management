// routes/gradesRouter.js
const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const gradesController = require('../controllers/resultController');

const router = express.Router();

// Student can view their grades for the modules they are enrolled in
router.get('/student', isAuthenticated, gradesController.getStudentGrades);

// Lecturer can add or update grades for students in the modules they teach
router.post('/lecturer', isAuthenticated, checkRole(['lecturer']), gradesController.addOrUpdateGrade);

module.exports = router;
