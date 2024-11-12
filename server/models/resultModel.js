const db = require('../db/database')


// Retrieve all results
exports.getAllResult = (id, callback) => {
    db.get('SELECT * FROM result', [], (err, row) => {
        callback(err, row);
    });
};

// Retrieve result by ID
exports.getResultById = (id, callback) => {
    db.all('SELECT * FROM result WHERE studentID = ?', [id], (err, rows) => {
        callback(err, rows);
    });
};

// Add a new result
exports.addResult = (result, callback) => {
    const {studentID, moduleID, grade} = result;
    const sql = 'INSERT INTO result (studentID, moduleID, grade) VALUES (?, ?, ?)';
    db.run(sql, [studentID, moduleID, grade], function (err) {
        callback(err, { id: this.lastID }); // Return ID of the inserted student 
    });   
};

// Update a result
exports.updateResult = (id, result, callback) => {
    const {studentID, moduleID, grade} = result;
    const sql = 'UPDATE result SET studentID= ?, moduleID= ?, grade= ?';
    db.run(sql, [studentID, moduleID, grade], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows updated
    });
};

// Delete a result
exports.deleteResult = (id, callback) => {
    const sql = 'DELETE FROM result WHERE studentID = ?';
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows deleted
    });
};