const express = require('express');
const cors = require('cors')
const app = express();
// const port = 3000;
// if running react concurrently
const port = 3001;

const dataInit = require('./dataInit');

app.use(cors())
app.use(express.json())


// Import routes for student, lecturer, course, module, enrollment, etc.
const studentRoutes = require('./routes/student');
const lecturerRoutes = require('./routes/lecturer');
const courseRoutes = require('./routes/course');
const moduleRoutes = require('./routes/module');
const resultRoutes = require('./routes/result');
const authRouter = require('./routes/authRouter'); 
const userRouter = require('./routes/user');  

// Mount routes for each resource
app.use('/', studentRoutes);
app.use('/', lecturerRoutes);
app.use('/', courseRoutes);
app.use('/', moduleRoutes);
app.use('/', resultRoutes);
app.use('/', userRouter);

// Mount auth routes
app.use('/auth', authRouter);  // Mount the authRouter, which handles /register, /login, etc.

// Import authentication middleware
const { isAuthenticated } = require('./middleware/auth');

// Setup middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests


// Protected Routes (authentication required)
app.use('/student', isAuthenticated, studentRoutes);  // Requires authentication
app.use('/lecturer', isAuthenticated, lecturerRoutes);  // Requires authentication
app.use('/course', isAuthenticated, courseRoutes);  // Requires authentication
app.use('/module', isAuthenticated, moduleRoutes);  // Requires authentication
app.use('/result', isAuthenticated, resultRoutes);  // Requires authentication

// Default route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the University Management System API');
});

// Global error handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`);
});