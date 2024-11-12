const db = require('../db/database')


// Retrieve all course
exports.getAllcourse = (id, callback) => {
    db.get('SELECT * FROM course', [], (err, row) => {
        callback(err, row);
    });
};

// Retrieve course by ID
exports.getcourseById = (id, callback) => {
    db.all('SELECT * FROM course WHERE courseID = ?', [id], (err, rows) => {
        callback(err, rows);
    });
};

// Add a new course
exports.addcourse = (course, callback) => {
    const {courseID, courseName, description} = course;
    const sql = 'INSERT INTO course (courseID, courseName, description) VALUES (?, ?, ?)';
    db.run(sql, [courseID, courseName, description], function (err) {
        callback(err, { id: this.lastID }); // Return ID of the inserted student 
    });   
};

// Update a course
exports.updatecourse = (id, course, callback) => {
    const {courseID, courseName, description} = course;
    const sql = 'UPDATE course SET courseID= ?, courseName= ?, description= ?';
    db.run(sql, [courseID, courseName, description], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows updated
    });
};

// Delete a course
exports.deletecourse = (id, callback) => {
    const sql = 'DELETE FROM course WHERE courseID = ?';
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows deleted
    });
};