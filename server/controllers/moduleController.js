const moduleModel = require('../models/moduleModel');

// Get all modules
exports.getAllmodule = (req, res) => {
    moduleModel.getAllmodule((err, modules) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving modules', error: err});
        }
        res.status(200).json(modules);
    });
};

// Get module by ID
exports.getmoduleById = (req, res) => {
    const { id } = req.params;  // Get module ID from request parameters
    moduleModel.getmoduleById(id, (err, module) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving module', error: err });
        }
        if (!module) {
            return res.status(404).json({ message: 'module not found' });
        }
        res.status(200).json(module);
    });
};

// Add new module
exports.addmodule = (req, res) => {
    const newmodule= req.body;
    moduleModel.addmodule(newmodule, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding module', error: err});
        }
        res.status(201).json({ message: 'module added successfully', moduleId: result.id });
    });

}


// Update a module
exports.updatemodule = (req, res) => {
    const { id } = req.params;  // Get module ID from request parameters
    const updatedmodule = req.body;  // Get updated module data from the request body
    moduleModel.updatemodule(id, updatedmodule, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating module', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'module not found or no changes made' });
        }
        res.status(200).json({ message: 'module updated successfully' });
    });
};

// Delete a module
exports.deletemodule = (req, res) => {
    const { id } = req.params;  // Get module ID from request parameters
    moduleModel.deletemodule(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting module', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'module not found' });
        }
        res.status(200).json({ message: 'module deleted successfully' });
    });
};