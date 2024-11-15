const courseService = require('../services/courseService'); 

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving courses', error: err.message });
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    const { id } = req.params; // Get course ID from request parameters
    try {
        const course = await courseService.getCourseById(id);
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving course', error: err.message });
    }
};

// Add new course
exports.addCourse = async (req, res) => {
    const newcourse = req.body; // Get new course data from request body
    try {
        const course = await courseService.addCourse(newcourse);
        res.status(201).json({ message: 'course added successfully', course });
    } catch (err) {
        res.status(500).json({ message: 'Error adding course', error: err.message });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    const { id } = req.params; // Get course ID from request parameters
    const updatedcourse = req.body; // Get updated course data from the request body
    try {
        const rowsUpdated = await courseService.updateCourse(id, updatedcourse);
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'course not found or no changes made' });
        }
        res.status(200).json({ message: 'course updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating course', error: err.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params; // Get course ID from request parameters
    try {
        const rowsDeleted = await courseService.deleteCourse(id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json({ message: 'course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting course', error: err.message });
    }
};
