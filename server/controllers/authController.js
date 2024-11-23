const authService = require('../services/authService');

const register = async (req, res) => {
  const { userId, username, password, role } = req.body;

  try {
    const newUser = await authService.registerUser(userId, username, password, role);
    res.status(201).json({
      message: 'User registered successfully!',
      userId: newUser.userId,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const token = await authService.loginUser(userId, password);
    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || 'Error logging in',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
