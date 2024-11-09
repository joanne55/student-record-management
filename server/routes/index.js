// server/routes/index.js
const router = require('express').Router();
const { auth, checkRole } = require('../middleware/auth');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
router.use(auth);

// Admin only routes
router.post('/students', checkRole(['admin']), dataController.create);
router.post('/courses', checkRole(['admin']), dataController.create);
router.post('/lecturers', checkRole(['admin']), dataController.create);
router.delete('/:type/:id', checkRole(['admin']), dataController.delete);

// Lecturer routes
router.post('/grades', checkRole(['lecturer']), dataController.createGrade);
router.put('/grades/:id', checkRole(['lecturer']), dataController.updateGrade);

// Mixed access routes
router.get('/:type', dataController.getAll);
router.get('/:type/:id', dataController.getOne);

module.exports = router;