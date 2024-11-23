// controllers/moduleController.js
const moduleService = require('../services/moduleService');

// Admin can GET all modules
const getModules = async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.json({
      message: 'Modules list retrieved successfully',
      data: modules
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving modules', error: error.message });
  }
};

// Admin can POST (create) a new module
const createModule = async (req, res) => {
  try {
    const { id, name, description, credits } = req.body;
    const newModule = await moduleService.createModule(id, name, description, credits);
    res.status(201).json({
      message: 'Module created successfully',
      data: newModule
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating module', error: error.message });
  }
};

// Admin can DELETE a module (discontinue)
const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    await moduleService.deleteModule(id);
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting module', error: error.message });
  }
};

// Students can view modules related to their enrolled courses
const getStudentModules = async (req, res) => {
  try {
    const studentId = req.user.userId; // From JWT payload

    const modules = await moduleService.getModulesForStudent(studentId);
    res.json({
      message: 'Modules for enrolled courses retrieved successfully',
      data: modules
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student modules', error: error.message });
  }
};

// Lecturers can view the modules they teach
const getLecturerModules = async (req, res) => {
  try {
    const lecturerId = req.user.userId; // From JWT payload

    const modules = await moduleService.getModulesForLecturer(lecturerId);
    res.json({
      message: 'Modules assigned to the lecturer retrieved successfully',
      data: modules
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lecturer modules', error: error.message });
  }
};

module.exports = {
  getModules,
  createModule,
  deleteModule,
  getStudentModules,
  getLecturerModules
};
