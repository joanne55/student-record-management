const Student = require('../models/studentModel');

// Retrieve all students
exports.getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        return students;
    } catch (err) {
        throw err;
    }
};

// Retrieve student by ID
exports.getStudentById = async (id) => {
    try {
        const student = await Student.findByPk(id);
        return student;
    } catch (err) {
        throw err;
    }
};

// Add a new student
exports.addStudent = async (studentData) => {
    try {
        const student = await Student.create(studentData);
        return student;
    } catch (err) {
        throw err;
    }
};

// Update a student
exports.updateStudent = async (id, studentData) => {
    try {
        const result = await Student.update(studentData, { where: { id } });
        return result[0]; // Number of rows updated
    } catch (err) {
        throw err;
    }
};

// Delete a student
exports.deleteStudent = async (id) => {
    try {
        const result = await Student.destroy({ where: { id } });
        return result; // Number of rows deleted
    } catch (err) {
        throw err;
    }
};
