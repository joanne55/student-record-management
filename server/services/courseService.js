const Course = require('../models/courseModel');

exports.getAllCourses = async () => {
    try {
        return await Course.findAll();
    } catch (err) {
        throw new Error('Error fetching courses: ' + err.message);
    }
};

exports.getCourseById = async (id) => {
    try {
        return await Course.findOne({ where: { courseID: id } });
    } catch (err) {
        throw new Error('Error fetching course by ID: ' + err.message);
    }
};

exports.addCourse = async (course) => {
    try {
        return await Course.create(course);
    } catch (err) {
        throw new Error('Error adding course: ' + err.message);
    }
};

exports.updateCourse = async (id, updatedCourse) => {
    try {
        const [updatedRows] = await Course.update(updatedCourse, { where: { courseID: id } });
        return updatedRows; // Number of rows updated
    } catch (err) {
        throw new Error('Error updating course: ' + err.message);
    }
};

exports.deleteCourse = async (id) => {
    try {
        const deletedRows = await Course.destroy({ where: { courseID: id } });
        return deletedRows; // Number of rows deleted
    } catch (err) {
        throw new Error('Error deleting course: ' + err.message);
    }
};
