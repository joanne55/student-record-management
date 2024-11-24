const studentService = require('../services/studentService');

// Admin: View all students
const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json({
      message: 'Student list retrieved successfully',
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving students',
      error: error.message,
    });
  }
};

// Admin: Add a new student
const addStudent = async (req, res) => {
  try {
    const { id, username, password, fname, lname, address, contact, dob, email } = req.body;
    // Log the incoming data for debugging
    console.log('Received data:', req.body);
    const result = await studentService.addStudent({ id, username, password, fname, lname, address, contact, dob, email });
    res.status(201).json({
      message: 'Student and user added successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding student and user',
      error: error.message,
    });
  }
};

// Student: Update personal details
const updateStudentDetails = async (req, res) => {
  try {
    const studentId = req.user.userId; // Extract from JWT payload
    const { Saddress, Scontact, Semail } = req.body;
    const updatedStudent = await studentService.updateStudentDetails(studentId, { Saddress, Scontact, Semail });
    res.json({
      message: 'Student details updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating student details',
      error: error.message,
    });
  }
};

// Admin: Delete a student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await studentService.deleteStudent(id);
    res.json({
      message: 'Student and associated user deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting student',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudentDetails,
  deleteStudent,
};
