// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

async function login(req, res) {
  const { username, password } = req.body;

  // Verify user credentials
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'User not found' });
   
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    // Create and return JWT
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token });
  });
}

async function register(req, res) {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], function(err) {
    if (err) return res.status(500).json({ message: 'Error registering user', error: err.message });
    res.status(201).json({ message: 'User registered' });
  });
}

module.exports = { login, register };
