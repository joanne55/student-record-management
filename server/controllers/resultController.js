// controllers/gradesController.js
const gradesService = require('../services/resultService');

// Student can view their grades for the modules they are enrolled in
const getStudentGrades = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const grades = await gradesService.getGradesForStudent(studentId);

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
};

// Lecturer can add or update grades for students in the modules they teach
const addOrUpdateGrade = async (req, res) => {
  try {
    const { studentId, moduleId, grade } = req.body;
    const lecturerId = req.user.userId;
    const updatedResult = await gradesService.addOrUpdateGrade(lecturerId, studentId, moduleId, grade);

    res.json({
      message: 'Grade added/updated successfully',
      data: updatedResult
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error assigning/updating grade',
      error: error.message
    });
  }
};

module.exports = {
  getStudentGrades,
  addOrUpdateGrade,
};
