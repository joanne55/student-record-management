const db = require('../db/database')


// Retrieve all lecturer
exports.getAlllecturer = (id, callback) => {
    db.get('SELECT * FROM lecturer', [], (err, row) => {
        callback(err, row);
    });
};

// Retrieve lecturer by ID
exports.getlecturerById = (id, callback) => {
    db.all('SELECT * FROM lecturer WHERE lecturerID = ?', [id], (err, rows) => {
        callback(err, rows);
    });
};

// Add a new lecturer
exports.addlecturer = (lecturer, callback) => {
    const {lecturerID, Fname, Lname, address, contact, email, department} = lecturer;
    const sql = 'INSERT INTO lecturer (lecturerID, Fname, Lname, address, contact, email, department) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [lecturerID, Fname, Lname, address, contact, email, department], function (err) {
        callback(err, { id: this.lastID }); // Return ID of the inserted student 
    });   
};

// Update a lecturer
exports.updatelecturer = (id, lecturer, callback) => {
    const {lecturerID, Fname, Lname, address, contact, email, department} = lecturer;
    const sql = 'UPDATE lecturer SET lecturerID= ?, Fname= ?, Lname= ?, address= ?, contact= ?, email= ?, department= ?';
    db.run(sql, [lecturerID, Fname, Lname, address, contact, email, department], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows updated
    });
};

// Delete a lecturer
exports.deletelecturer = (id, callback) => {
    const sql = 'DELETE FROM lecturer WHERE lecturerID = ?';
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows deleted
    });
};