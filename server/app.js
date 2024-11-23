// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const routes = require('./routes/index'); 

// Connect to db and insert test data
require('./db/dataInit');

// Middleware
app.use(cors())
app.use(express.json());

// Use main router for all API routes
app.use('/api', routes);        // '/api' will be the base route, differentiated routes in routes/index.js

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

