const lecturerService = require('../services/lecturerService'); 

// Get all lecturers
exports.getAlllecturers = async (req, res) => {
    try {
        const lecturers = await lecturerService.getAlllecturers();
        res.status(200).json(lecturers);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving lecturers', error: err.message });
    }
};

// Get lecturer by ID
exports.getlecturerById = async (req, res) => {
    const { id } = req.params; // Get lecturer ID from request parameters
    try {
        const lecturer = await lecturerService.getlecturerById(id);
        if (!lecturer) {
            return res.status(404).json({ message: 'lecturer not found' });
        }
        res.status(200).json(lecturer);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving lecturer', error: err.message });
    }
};

// Add new lecturer
exports.addlecturer = async (req, res) => {
    const newlecturer = req.body; // Get new lecturer data from request body
    try {
        const lecturer = await lecturerService.addlecturer(newlecturer);
        res.status(201).json({ message: 'lecturer added successfully', lecturer });
    } catch (err) {
        res.status(500).json({ message: 'Error adding lecturer', error: err.message });
    }
};

// Update a lecturer
exports.updatelecturer = async (req, res) => {
    const { id } = req.params; // Get lecturer ID from request parameters
    const updatedlecturer = req.body; // Get updated lecturer data from the request body
    try {
        const rowsUpdated = await lecturerService.updatelecturer(id, updatedlecturer);
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'lecturer not found or no changes made' });
        }
        res.status(200).json({ message: 'lecturer updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating lecturer', error: err.message });
    }
};

// Delete a lecturer
exports.deletelecturer = async (req, res) => {
    const { id } = req.params; // Get lecturer ID from request parameters
    try {
        const rowsDeleted = await lecturerService.deletelecturer(id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'lecturer not found' });
        }
        res.status(200).json({ message: 'lecturer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting lecturer', error: err.message });
    }
};
