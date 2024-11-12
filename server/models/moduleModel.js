const db = require('../db/database')


// Retrieve all modules
exports.getAllModules = (id, callback) => {
    db.get('SELECT * FROM module', [], (err, row) => {
        callback(err, row);
    });
};

// Retrieve module by ID
exports.getModuleById = (id, callback) => {
    db.all('SELECT * FROM module WHERE studentID = ?', [id], (err, rows) => {
        callback(err, rows);
    });
};

// Add a new module
exports.addModule = (module, callback) => {
    const {moduleID, moduleName, description, credits, lecturerID, courseID} = module;
    const sql = 'INSERT INTO module (moduleID, moduleName, description, credits, lecturerID, courseID) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [moduleID, moduleName, description, credits, lecturerID, courseID], function (err) {
        callback(err, { id: this.lastID }); // Return ID of the inserted student 
    });   
};

// Update a module
exports.updateModule = (id, module, callback) => {
    const {moduleID, moduleName, description, credits, lecturerID, courseID} = module;
    const sql = 'UPDATE module SET moduleID= ?, moduleName= ?, description= ?, credits= ?, lecturerID= ?, courseID= ?';
    db.run(sql, [moduleID, moduleName, description, credits, lecturerID, courseID], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows updated
    });
};

// Delete a module
exports.deleteModule = (id, callback) => {
    const sql = 'DELETE FROM module WHERE moduleID = ?';
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes }); // Return number of rows deleted
    });
};