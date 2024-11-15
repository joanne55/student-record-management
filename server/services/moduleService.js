const Module = require('../models/moduleModel');

exports.getAllModules = async () => {
    try {
        return await Module.findAll();
    } catch (err) {
        throw new Error('Error fetching modules: ' + err.message);
    }
};

exports.getModuleById = async (id) => {
    try {
        return await Module.findOne({ where: { moduleID: id } });
    } catch (err) {
        throw new Error('Error fetching module by ID: ' + err.message);
    }
};

exports.addModule = async (module) => {
    try {
        return await Module.create(module);
    } catch (err) {
        throw new Error('Error adding module: ' + err.message);
    }
};

exports.updateModule = async (id, updatedModule) => {
    try {
        const [updatedRows] = await Module.update(updatedModule, { where: { moduleID: id } });
        return updatedRows; // Number of rows updated
    } catch (err) {
        throw new Error('Error updating module: ' + err.message);
    }
};

exports.deleteModule = async (id) => {
    try {
        const deletedRows = await Module.destroy({ where: { moduleID: id } });
        return deletedRows; // Number of rows deleted
    } catch (err) {
        throw new Error('Error deleting module: ' + err.message);
    }
};
