// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('database.db');
const routes = require('./routes/index'); 

// Middleware
app.use(express.json());

// Use main router for all API routes
app.use('/api', routes);        // '/api' will be the base route, differentiated routes in routes/index.js

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

