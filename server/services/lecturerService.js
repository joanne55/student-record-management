const Lecturer = require('../models/lecturerModel');

exports.getAllLecturers = async () => {
    try {
        return await Lecturer.findAll();
    } catch (err) {
        throw new Error('Error fetching lecturers: ' + err.message);
    }
};

exports.getLecturerById = async (id) => {
    try {
        return await Lecturer.findOne({ where: { lecturerID: id } });
    } catch (err) {
        throw new Error('Error fetching lecturer by ID: ' + err.message);
    }
};

exports.addLecturer = async (lecturer) => {
    try {
        return await Lecturer.create(lecturer);
    } catch (err) {
        throw new Error('Error adding lecturer: ' + err.message);
    }
};

exports.updateLecturer = async (id, updatedLecturer) => {
    try {
        const [updatedRows] = await Lecturer.update(updatedLecturer, { where: { lecturerID: id } });
        return updatedRows; // Number of rows updated
    } catch (err) {
        throw new Error('Error updating lecturer: ' + err.message);
    }
};

exports.deleteLecturer = async (id) => {
    try {
        const deletedRows = await Lecturer.destroy({ where: { lecturerID: id } });
        return deletedRows; // Number of rows deleted
    } catch (err) {
        throw new Error('Error deleting lecturer: ' + err.message);
    }
};
