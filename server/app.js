// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const {studentRoutes, authRoutes, courseRoutes, userRoutes, lecturerRoutes, moduleRoutes, resultRoutes} = require('./routes')


// Connect to db and insert test data
require('./db/dataInit');

// Middleware
app.use(cors())
app.use(express.json());

// Use main router for all API routes
app.use('/api/student', studentRoutes);        // '/api' will be the base route, differentiated routes in routes/index.js
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);  
app.use('/api/lecturer', lecturerRoutes);  
app.use('/api/module', moduleRoutes);  
app.use('/api/result', resultRoutes);
app.use('/api/course', courseRoutes);    

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

