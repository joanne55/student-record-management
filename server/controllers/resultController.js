const resultModel = require('../models/resultModel');

// Get all results
exports.getAllresult = (req, res) => {
    resultModel.getAllresult((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving results', error: err});
        }
        res.status(200).json(results);
    });
};

// Get result by ID
exports.getresultById = (req, res) => {
    const { id } = req.params;  // Get result ID from request parameters
    resultModel.getresultById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving result', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'result not found' });
        }
        res.status(200).json(result);
    });
};

// Add new result
exports.addresult = (req, res) => {
    const newresult= req.body;
    resultModel.addresult(newresult, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding result', error: err});
        }
        res.status(201).json({ message: 'result added successfully', resultId: result.id });
    });

}


// Update a result
exports.updateresult = (req, res) => {
    const { id } = req.params;  // Get result ID from request parameters
    const updatedresult = req.body;  // Get updated result data from the request body
    resultModel.updateresult(id, updatedresult, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating result', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'result not found or no changes made' });
        }
        res.status(200).json({ message: 'result updated successfully' });
    });
};

// Delete a result
exports.deleteresult = (req, res) => {
    const { id } = req.params;  // Get result ID from request parameters
    resultModel.deleteresult(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting result', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'result not found' });
        }
        res.status(200).json({ message: 'result deleted successfully' });
    });
};