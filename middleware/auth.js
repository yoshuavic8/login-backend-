// authMiddleware.js

const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Error in the verifying process', error: err });
    } else {
      // The token is valid; you can access user information in 'decoded' if needed
      return next(); // Continue to the next middleware or route
    }
  });
}

module.exports = isAuthenticated;
