const courseModel = require('../models/courseModel');

// Get all courses
exports.getAllcourse = (req, res) => {
    courseModel.getAllcourse((err, courses) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving courses', error: err});
        }
        res.status(200).json(courses);
    });
};

// Get course by ID
exports.getcourseById = (req, res) => {
    const { id } = req.params;  // Get course ID from request parameters
    courseModel.getcourseById(id, (err, course) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving course', error: err });
        }
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json(course);
    });
};

// Add new course
exports.addcourse = (req, res) => {
    const newcourse= req.body;
    courseModel.addcourse(newcourse, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding course', error: err});
        }
        res.status(201).json({ message: 'course added successfully', courseId: result.id });
    });

}


// Update a course
exports.updatecourse = (req, res) => {
    const { id } = req.params;  // Get course ID from request parameters
    const updatedcourse = req.body;  // Get updated course data from the request body
    courseModel.updatecourse(id, updatedcourse, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating course', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'course not found or no changes made' });
        }
        res.status(200).json({ message: 'course updated successfully' });
    });
};

// Delete a course
exports.deletecourse = (req, res) => {
    const { id } = req.params;  // Get course ID from request parameters
    courseModel.deletecourse(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting course', error: err });
        }
        if (result.changes === 0) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json({ message: 'course deleted successfully' });
    });
};