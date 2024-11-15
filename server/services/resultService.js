const Result = require('../models/resultModel');

exports.getAllResults = async () => {
    try {
        return await Result.findAll();
    } catch (err) {
        throw new Error('Error fetching results: ' + err.message);
    }
};

exports.getResultById = async (id) => {
    try {
        return await Result.findAll({ where: { studentID: id } });
    } catch (err) {
        throw new Error('Error fetching result by ID: ' + err.message);
    }
};

exports.addResult = async (result) => {
    try {
        return await Result.create(result); // Sequelize automatically returns the created object
    } catch (err) {
        throw new Error('Error adding result: ' + err.message);
    }
};

exports.updateResult = async (id, result) => {
    try {
        const [updatedRows] = await Result.update(result, { where: { id } });
        return updatedRows; // Number of rows updated
    } catch (err) {
        throw new Error('Error updating result: ' + err.message);
    }
};

exports.deleteResult = async (id) => {
    try {
        const deletedRows = await Result.destroy({ where: { studentID: id } });
        return deletedRows; // Number of rows deleted
    } catch (err) {
        throw new Error('Error deleting result: ' + err.message);
    }
};
