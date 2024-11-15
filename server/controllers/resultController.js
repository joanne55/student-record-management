const resultService = require('../services/resultService'); 

// Get all results
exports.getAllresults = async (req, res) => {
    try {
        const results = await resultService.getAllresults();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving results', error: err.message });
    }
};

// Get result by ID
exports.getResultById = async (req, res) => {
    const { id } = req.params; // Get result ID from request parameters
    try {
        const result = await resultService.getResultById(id);
        if (!result) {
            return res.status(404).json({ message: 'result not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving result', error: err.message });
    }
};

// Add new result
exports.addResult = async (req, res) => {
    const newresult = req.body; // Get new result data from request body
    try {
        const result = await resultService.addResult(newresult);
        res.status(201).json({ message: 'result added successfully', result });
    } catch (err) {
        res.status(500).json({ message: 'Error adding result', error: err.message });
    }
};

// Update a result
exports.updateResult = async (req, res) => {
    const { id } = req.params; // Get result ID from request parameters
    const updatedresult = req.body; // Get updated result data from the request body
    try {
        const rowsUpdated = await resultService.updateResult(id, updatedresult);
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'result not found or no changes made' });
        }
        res.status(200).json({ message: 'result updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating result', error: err.message });
    }
};

// Delete a result
exports.deleteResult = async (req, res) => {
    const { id } = req.params; // Get result ID from request parameters
    try {
        const rowsDeleted = await resultService.deleteResult(id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'result not found' });
        }
        res.status(200).json({ message: 'result deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting result', error: err.message });
    }
};
