const express = require('express');
// Import models
const models = require('../models');

const { isAuthenticated, checkRole } = require('../middleware/auth');
const router = express.Router();
// Admin can GET all modules
router.get('/module', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const modules = await models.Module.findAll();
    res.json({
      message: 'Modules list retrieved successfully',
      data: modules
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving modules', error: error.message });
  }
});

// Admin can POST (create) a new module
router.post('/module', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id, name, description, credits } = req.body;
    const newModule = await models.Module.create({ moduleId:id, moduleName:name, description:description, credit:credits });
    res.status(201).json({
      message: 'Module created successfully',
      data: newModule
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating module', error: error.message });
  }
});

// Admin can DELETE a module (discontinue)
router.delete('/:id', isAuthenticated, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const module = await models.Module.findByPk(id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    await module.destroy();
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting module', error: error.message });
  }
});

// 2) Students can view modules related to their enrolled courses
router.get('/student/modules', isAuthenticated, checkRole(['student']), async (req, res) => {
  try {
    console.log(req.user);  // Log user information to verify the payload
    const studentId = req.user.userId; // Assuming the studentId is stored in the JWT payload

    // Find courses the student is enrolled in

    const enrolledCourses = await models.Enrollment.findAll({
      where: { Sid:studentId },
      include: [{ model: models.Course, attributes: ['courseId'] }],
      logging: console.log// Log the SQL query
      
    });
    
    if (enrolledCourses.length === 0) {
      return res.status(404).json({ message: 'Student is not enrolled in any courses' });
    }
    
    // Extract the courseId values from the enrolledCourses
    const courseIds = enrolledCourses.map(e => e.Course.courseId);  // Access the 'Course' model's 'courseId' attribute
    
    // Get modules for the courses the student is enrolled in
    const modules = await models.Contains.findAll({
      where: { courseId: courseIds },  // Pass the list of courseIds
      include: [{ model: models.Module, attributes: ['moduleId', 'moduleName', 'description', 'credit'] }]
    });
    
    res.json({
      message: 'Modules for enrolled courses retrieved successfully',
      data: modules
    });
   
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student modules', error: error.message });
  }
});

// 3) Lecturers can view the modules they teach
router.get('/lecturer/modules', isAuthenticated, checkRole(['lecturer']), async (req, res) => {
  try {
    const lecturerId = req.user.userId; // Assuming the lecturerId is stored in the JWT payload

    // Find modules taught by the lecturer
    const modules = await models.Teach.findAll({
      where: { Lid: lecturerId },
      include: [{ model: models.Module, attributes: ['moduleId', 'moduleName', 'description', 'credit'] }]
    });

    if (modules.length === 0) {
      return res.status(404).json({ message: 'Lecturer is not assigned to any modules' });
    }

    res.json({
      message: 'Modules assigned to the lecturer retrieved successfully',
      data: modules
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lecturer modules', error: error.message });
  }
});

module.exports = router;