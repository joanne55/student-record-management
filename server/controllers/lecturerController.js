// controllers/lecturerController.js
const lecturerService = require('../services/lecturerService');

// Admin can GET all lecturers
const getLecturers = async (req, res) => {
  try {
    const lecturers = await lecturerService.getAllLecturers();
    res.json({
      message: 'Lecturer list retrieved successfully',
      data: lecturers
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving lecturers',
      error: error.message
    });
  }
};

// Admin can POST (add) a new lecturer and create the associated user at the same time
const addLecturer = async (req, res) => {
  try {
    const { id, username, password, fname, lname, address, contact, email, department } = req.body;
    const newLecturer = await lecturerService.addLecturerAndUser(id, username, password, fname, lname, address, contact, email, department);
    
    res.status(201).json({
      message: 'Lecturer and user added successfully',
      data: newLecturer
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding lecturer and user',
      error: error.message
    });
  }
};

// Admin can DELETE a lecturer (when they leave the institution)
const deleteLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    await lecturerService.deleteLecturer(id);
    
    res.json({
      message: 'Lecturer and associated user deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting lecturer',
      error: error.message
    });
  }
};

module.exports = {
  getLecturers,
  addLecturer,
  deleteLecturer
};
