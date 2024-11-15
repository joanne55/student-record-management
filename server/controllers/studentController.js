const studentService = require('../services/studentService'); 

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students', error: err.message });
    }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
    const { id } = req.params; // Get student ID from request parameters
    try {
        const student = await studentService.getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving student', error: err.message });
    }
};

// Add new student
exports.addStudent = async (req, res) => {
    const newStudent = req.body; // Get new student data from request body
    try {
        const student = await studentService.addStudent(newStudent);
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (err) {
        res.status(500).json({ message: 'Error adding student', error: err.message });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    const { id } = req.params; // Get student ID from request parameters
    const updatedStudent = req.body; // Get updated student data from the request body
    try {
        const rowsUpdated = await studentService.updateStudent(id, updatedStudent);
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Student not found or no changes made' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating student', error: err.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params; // Get student ID from request parameters
    try {
        const rowsDeleted = await studentService.deleteStudent(id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};
