const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify the token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('Secret key not set in environment variables');
    }

    const decoded = await jwt.verify(token, secretKey);
    req.decoded = decoded;

    next();
  } 
  catch (err) {
    console.error('Token verification error:', err);
    res.status(403).json({ message: 'Token is invalid or expired' });
  }
}

module.exports = authenticateToken;