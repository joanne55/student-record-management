// routes/courseRoute.js
const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

const router = express.Router();

// Admin can GET all courses
router.get('/', isAuthenticated, checkRole(['admin']), courseController.getCourses);

// Admin can POST (add) a new course
router.post('/', isAuthenticated, checkRole(['admin']), courseController.addCourse);

// Admin can DELETE a course (if it’s discontinued)
router.delete('/:id', isAuthenticated, checkRole(['admin']), courseController.deleteCourse);

module.exports = router;
