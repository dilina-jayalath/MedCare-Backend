const jwt = require('jsonwebtoken');

// Middleware to verify token and get user ID
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, '5961f68', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.user = decoded.id; // Store user ID from the token
    console.log('User ID: ', req.user);
    next();
  });
};

module.exports = verifyToken;
