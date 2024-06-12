const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    req.userRole = verified.role;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
