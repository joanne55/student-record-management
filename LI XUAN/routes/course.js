const express = require('express');
// Import models
const models = require('../models');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const router = express.Router();

// Admin can GET all courses
router.get('/courses', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await models.Course.findAll();

    // Send the list of courses as a JSON response
    res.json({
      message: 'Course list retrieved successfully',
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving courses',
      error: error.message
    });
  }
});

// Admin can POST (add) a new course
router.post('/course', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { courseid,name, description } = req.body;

    // Validate that course details are provided
    if (!name || !description) {
      return res.status(400).json({
        message: 'Course name and description are required.'
      });
    }

    // Create a new course in the database
    const newCourse = await models.Course.create({
      courseId:courseid,
      courseName: name,
      description:description
    });

    // Return the created course in the response
    res.status(201).json({
      message: 'Course added successfully',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding course',
      error: error.message
    });
  }
});

// Admin can DELETE a course (if it’s discontinued)
router.delete('/course/:id', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    // Find the course by primary key (ID)
    const course = await models.Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // Deleting a course will also remove associations in `Contains` table due to "CASCADE" defined in the associations
    await course.destroy();

    res.json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting course',
      error: error.message
    });
  }
});

module.exports = router;
