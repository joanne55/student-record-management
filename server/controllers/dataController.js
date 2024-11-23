const db = require('../db/dbConfig');

// Get all records with role-based restrictions
exports.getAll = (req, res) => {
  const { type } = req.params;
  const { role, id } = req.user;

  let query = `SELECT * FROM ${type}`;
  const params = [];

  // Role-based filtering
  if (role === 'student') {
    if (type === 'courses' || type === 'modules' || type === 'lecturers' || type === 'results') {
      // Only show student's specific courses, modules, etc.
      query += ` WHERE student_id = ?`;
      params.push(id);
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  }

  db.all(query, params, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Get a single record
exports.getOne = (req, res) => {
  const { type, id } = req.params;
  const { role, userId } = req.user;

  let query = `SELECT * FROM ${type} WHERE id = ?`;
  const params = [id];

  // Role-based restriction for students
  if (role === 'student' && (type === 'courses' || type === 'modules' || type === 'results')) {
    query += ` AND student_id = ?`;
    params.push(userId);
  } else if (role === 'student') {
    return res.status(403).json({ message: "Access denied" });
  }

  db.get(query, params, (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data) return res.status(404).json({ message: `${type} not found` });
    res.json(data);
  });
};

// Create a new record (Admin and Lecturer can use this for different resources)
exports.create = (req, res) => {
  const { type } = req.params;
  const { role } = req.user;

  // Restrict result creation to lecturers only
  if (type === 'results' && role !== 'lecturer') {
    return res.status(403).json({ message: "Access denied" });
  } else if (type !== 'results' && role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }

  const fields = Object.keys(req.body).join(', ');
  const values = Object.values(req.body);
  const placeholders = values.map(() => '?').join(', ');

  db.run(
    `INSERT INTO ${type} (${fields}) VALUES (${placeholders})`,
    values,
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Created successfully' });
    }
  );
};

// Update a record
exports.update = (req, res) => {
  const { type, id } = req.params;
  const { role } = req.user;

  // Only lecturers can update results, admins for other data types
  if (type === 'results' && role !== 'lecturer') {
    return res.status(403).json({ message: "Access denied" });
  } else if (type !== 'results' && role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }

  const fields = Object.keys(req.body).map(key => `${key} = ?`).join(', ');
  const values = Object.values(req.body);

  db.run(
    `UPDATE ${type} SET ${fields} WHERE id = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    }
  );
};

// Delete a record
exports.delete = (req, res) => {
  const { type, id } = req.params;
  const { role } = req.user;

  // Only allow admins to delete all data types except results
  if (type === 'results' || role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }

  db.run(`DELETE FROM ${type} WHERE id = ?`, id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
};

// Lecturer-specific functions for grade CRUD operations
exports.createGrade = (req, res) => {
  const { role } = req.user;
  if (role !== 'lecturer') return res.status(403).json({ message: "Access denied" });

  const { student_id, module_id, grade } = req.body;
  db.run(
    `INSERT INTO results (student_id, module_id, grade) VALUES (?, ?, ?)`,
    [student_id, module_id, grade],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Grade added successfully' });
    }
  );
};

exports.updateGrade = (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  if (role !== 'lecturer') return res.status(403).json({ message: "Access denied" });

  const { grade } = req.body;
  db.run(
    `UPDATE results SET grade = ? WHERE id = ?`,
    [grade, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Grade updated successfully' });
    }
  );
};
