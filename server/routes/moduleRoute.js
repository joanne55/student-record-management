// routes/moduleRoute.js
const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const moduleController = require('../controllers/moduleController');

const router = express.Router();

// Admin can GET all modules
router.get('/', isAuthenticated, checkRole(['admin']), moduleController.getModules);

// Admin can POST (create) a new module
router.post('/', isAuthenticated, checkRole(['admin']), moduleController.createModule);

// Admin can DELETE a module (discontinue)
router.delete('/:id', isAuthenticated, checkRole(['admin']), moduleController.deleteModule);

// Students can view modules related to their enrolled courses
router.get('/student', isAuthenticated, checkRole(['student']), moduleController.getStudentModules);

// Lecturers can view the modules they teach
router.get('/lecturer', isAuthenticated, checkRole(['lecturer']), moduleController.getLecturerModules);

module.exports = router;
