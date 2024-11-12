const lecturerModel = require('../models/lecturerModel');

// Get all lecturers
exports.getAlllecturer = (req, res) => {
    lecturerModel.getAlllecturer((err, lecturers) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving lecturers', error: err});
        }
        res.status(200).json(lecturers);
    });
};

// Get lecturer by ID
exports.getlecturerById = (req, res) => {
    const { id } = req.params;  // Get lecturer ID from request parameters
    lecturerModel.getlecturerById(id, (err, lecturer) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving lecturer', error: err });
        }
        if (!lecturer) {
            return res.status(404).json({ message: 'lecturer not found' });
        }
        res.status(200).json(lecturer);
    });
};

// Add new lecturer
exports.addlecturer = (req, res) => {
    const newlecturer= req.body;
    lecturerModel.addlecturer(newlecturer, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding lecturer', error: err});
        }
        res.status(201).json({ message: 'lecturer added successfully', lecturerId: result.id });
    });

}


// Update a lecturer
exports.updatelecturer = (req, res) => {
    const { id } = req.params;  // Get lecturer ID from request parameters
    const updatedlecturer = req.body;  // Get updated lecturer data from the request body
    lecturerModel.updatelecturer(id, updatedlecturer, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating lecturer', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'lecturer not found or no changes made' });
        }
        res.status(200).json({ message: 'lecturer updated successfully' });
    });
};

// Delete a lecturer
exports.deletelecturer = (req, res) => {
    const { id } = req.params;  // Get lecturer ID from request parameters
    lecturerModel.deletelecturer(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting lecturer', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'lecturer not found' });
        }
        res.status(200).json({ message: 'lecturer deleted successfully' });
    });
};