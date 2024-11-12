const studentModel = require('../models/studentModel');

// Get all students
exports.getAllStudent = (req, res) => {
    studentModel.getAllStudent((err, students) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving students', error: err});
        }
        res.status(200).json(students);
    });
};

// Get student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;  // Get student ID from request parameters
    studentModel.getStudentById(id, (err, student) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving student', error: err });
        }
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    });
};

// Add new student
exports.addStudent = (req, res) => {
    const newStudent= req.body;
    studentModel.addStudent(newStudent, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding student', error: err});
        }
        res.status(201).json({ message: 'Student added successfully', studentId: result.id });
    });

}


// Update a student
exports.updateStudent = (req, res) => {
    const { id } = req.params;  // Get student ID from request parameters
    const updatedStudent = req.body;  // Get updated student data from the request body
    studentModel.updateStudent(id, updatedStudent, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating student', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Student not found or no changes made' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    });
};

// Delete a student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;  // Get student ID from request parameters
    studentModel.deleteStudent(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting student', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    });
};