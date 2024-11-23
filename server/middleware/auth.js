const jwt = require('jsonwebtoken'); // Assuming JWT for token-based authentication

// Middleware to verify if the user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from the 'Authorization' header
    console.log('Token:', token); // Log the token to check if it's being extracted correctly
    
    if (!token) {
        return res.status(401).send('Access Denied: No token provided');
    }

    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Token');
        }
        req.user = user; // Attach user data to the request object
        next();
    });
};

// Middleware to check if the user has one of the specified roles
const checkRole = (roles) => {
    return (req, res, next) => {
        // Check if the user's role is in the provided list of roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden: You do not have the required role');
        }
        next();
    };
};

module.exports = { isAuthenticated, checkRole };
