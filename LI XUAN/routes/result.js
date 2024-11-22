// routes/gradesRouter.js

const express = require('express');
// Import models
const models = require('../models');

const { isAuthenticated, checkRole } = require('../middleware/auth');
const router = express.Router();

// 1) Student can view their grades for the modules they are enrolled in
router.get('student/grades', isAuthenticated, async (req, res) => {
  try {
    const studentId = req.user.userId; 

    // Find the grades for the student by joining Result, Module, and Student
    const grades = await models.Result.findAll({
      where: { Sid:studentId },
      include: {
        model: models.Module,
        attributes: ['moduleId', 'moduleName'], // Include module details
      }
    });

    if (!grades || grades.length === 0) {
      return res.status(404).json({
        message: 'No grades found for this student.'
      });
    }

    res.json({
      message: 'Grades retrieved successfully',
      data: grades,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving grades',
      error: error.message
    });
  }
});

// 2) Lecturer can add or update grades for students in the modules they teach
router.post('/lecturer/grades', isAuthenticated, checkRole(['lecturer']), async (req, res) => {
  try {
    const { studentId, moduleId, grade } = req.body;
    const lecturerId = req.user.userId; // Assuming the user ID is available via the auth middleware

    // Check if the lecturer teaches the module
    const teach = await models.Teach.findOne({ where: { Lid: lecturerId, moduleId } });
    
    if (!teach) {
      return res.status(403).json({
        message: 'You are not authorized to assign grades for this module.'
      });
    }

    // Check if the student is enrolled in the module
    const result = await models.Result.findOne({ where: { Sid:studentId, moduleId } });

    if (!result) {
      return res.status(404).json({
        message: 'Student is not enrolled in this module.'
      });
    }

    // Update the grade if it exists, otherwise create a new entry
    result.grade = grade;
    await result.save();

    res.json({
      message: 'Grade added/updated successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error assigning/updating grade',
      error: error.message
    });
  }
});

module.exports = router;
