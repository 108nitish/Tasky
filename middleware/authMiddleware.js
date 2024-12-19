const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          req.user = null;
        } else {
          req.user = decoded; // Store decoded token in req.user
        }
        next();
      });
    } else {
      req.user = null;
      next();
    }
  };

module.exports = authMiddleware;
