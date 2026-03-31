import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const sendTokenResponse = async (user, statusCode, res) => {
  const token = generateToken(user.id);

  // Convert PostgreSQL user object to response format
  const userData = await User.getUserResponse(user);

  res.status(statusCode).json({
    success: true,
    token,
    user: userData,
  });
};
