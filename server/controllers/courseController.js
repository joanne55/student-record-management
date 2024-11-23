// controllers/courseController.js
const courseService = require('../services/courseService');

// Admin can GET all courses
const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
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
};

// Admin can POST (add) a new course
const addCourse = async (req, res) => {
  try {
    const { courseid, name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: 'Course name and description are required.'
      });
    }

    const newCourse = await courseService.addCourse(courseid, name, description);
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
};

// Admin can DELETE a course (if it’s discontinued)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await courseService.deleteCourse(id);
    res.json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting course',
      error: error.message
    });
  }
};

module.exports = {
  getCourses,
  addCourse,
  deleteCourse
};
