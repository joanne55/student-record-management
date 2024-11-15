const moduleService = require('../services/moduleService'); 

// Get all modules
exports.getAllModules = async (req, res) => {
    try {
        const modules = await moduleService.getAllModules();
        res.status(200).json(modules);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving modules', error: err.message });
    }
};

// Get module by ID
exports.getModuleById = async (req, res) => {
    const { id } = req.params; // Get module ID from request parameters
    try {
        const module = await moduleService.getModuleById(id);
        if (!module) {
            return res.status(404).json({ message: 'module not found' });
        }
        res.status(200).json(module);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving module', error: err.message });
    }
};

// Add new module
exports.addModule = async (req, res) => {
    const newmodule = req.body; // Get new module data from request body
    try {
        const module = await moduleService.addModule(newmodule);
        res.status(201).json({ message: 'module added successfully', module });
    } catch (err) {
        res.status(500).json({ message: 'Error adding module', error: err.message });
    }
};

// Update a module
exports.updateModule = async (req, res) => {
    const { id } = req.params; // Get module ID from request parameters
    const updatedmodule = req.body; // Get updated module data from the request body
    try {
        const rowsUpdated = await moduleService.updateModule(id, updatedmodule);
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'module not found or no changes made' });
        }
        res.status(200).json({ message: 'module updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating module', error: err.message });
    }
};

// Delete a module
exports.deleteModule = async (req, res) => {
    const { id } = req.params; // Get module ID from request parameters
    try {
        const rowsDeleted = await moduleService.deleteModule(id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'module not found' });
        }
        res.status(200).json({ message: 'module deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting module', error: err.message });
    }
};
