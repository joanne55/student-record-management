const db = require('../db/database')


// Retrieve all student
exports.getAllStudent = (id, callback) => {
    db.get('SELECT * FROM student', [], (err, row) => {
        callback(err, row);
    });
};

// Retrieve student by ID
exports.getStudentById = (id, callback) => {
    db.all('SELECT * FROM items WHERE studentID = ?', [id], (err, rows) => {
        callback(err, rows);
    });
};

// Add a new student
exports.addStudent = (student, callback) => {
    const {Fname, Lname, address, contact, email, DOB, enrollDate, courseID} = student;
    const sql = 'INSERT INTO student (Fname, Lname, address, contact, email, DOB, enrollDate, courseID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [Fname, Lname, address, contact, email, DOB, enrollDate, courseID], function (err) {
        callback(err, { id: this.lastID }); // Return ID of the inserted student 
    });   
};

// Update a student
exports.updateStudent = (id, student, callback) => {
    const { Fname, Lname, address, contact, email, DOB, enrollDate, courseID } = student;
    const sql = 'UPDATE student SET Fname = ?, Lname = ?, address = ?, contact = ?, email = ?, DOB = ?, enrollDate = ?, courseID = ? WHERE id = ?';
    db.run(sql, [Fname, Lname, address, contact, email, DOB, enrollDate, courseID, id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows updated
    });
};

// Delete a student
exports.deleteStudent = (id, callback) => {
    const sql = 'DELETE FROM student WHERE studentID = ?';
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows deleted
    });
};