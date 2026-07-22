const jwt = require('jsonwebtoken')
const db_connection = require('../config/db_config')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
    return res.status(403).json({
        message: "Invalid or expired token.",
    });
    }

    req.userId = decoded.userId
    next()
  })
}

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const checkQuery = "SELECT role FROM users WHERE id = ?"
    db_connection.query(checkQuery, [req.userId], (err, result) => {
      if (err) {
        console.error("Authorization middleware database error:", err)
        return res.status(500).json({ message: "Internal server error during authorization." })
      }

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "User not found." })
      }

      const userRole = result[0].role
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access forbidden. Insufficient permissions." })
      }

      req.userRole = userRole
      next()
    })
  }
}

module.exports = {
  verifyToken,
  authorizeRoles
}
