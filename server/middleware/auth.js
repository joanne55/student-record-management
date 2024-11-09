// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';  // Use environment variable in production

// Middleware to authenticate JWT token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.user = user;
    next();
  });
}

// Middleware to check roles
function checkRole(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = { auth, checkRole };
