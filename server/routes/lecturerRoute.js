// routes/lecturerRoute.js
const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
const lecturerController = require('../controllers/lecturerController');

const router = express.Router();

// Admin can GET all lecturers
router.get('/', isAuthenticated, checkRole(['admin']), lecturerController.getLecturers);

// Admin can POST (add) a new lecturer and create the associated user at the same time
router.post('/', isAuthenticated, checkRole(['admin']), lecturerController.addLecturer);

// Admin can DELETE a lecturer (when they leave the institution)
router.delete('/:id', isAuthenticated, checkRole(['admin']), lecturerController.deleteLecturer);

module.exports = router;
