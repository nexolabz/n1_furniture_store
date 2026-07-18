const db_connection = require('../config/db_config')
const bcrypt = require('bcrypt')

// Fetch users based on the logged-in user's role
const getUsers = async (req, res) => {
  const currentRole = req.userRole

  let query = ""
  let queryParams = []

  if (currentRole === 'SUPER_ADMIN') {
    query = "SELECT id, full_name, email, role, created_at FROM users WHERE role IN ('STORE_OWNER','STORE_STAFF')"
  } else if (currentRole === 'STORE_OWNER') {
    query = "SELECT id, full_name, email, role, created_at FROM users WHERE role IN ('STORE_STAFF')"
  } else {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." })
  }

  db_connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err)
      return res.status(500).json({ message: "Error fetching users" })
    }
    return res.status(200).json(results)
  })
}

// Create user with administrative roles
const createUser = async (req, res) => {
  const { fullName, email, password, role } = req.body
  const creatorRole = req.userRole

  // 1. Basic validation
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields (fullName, email, password, role) are required" })
  }

  // 2. Email syntax check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." })
  }

  // 3. Password complexity validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters."
    })
  }

  // 4. Role authorization check
  const allowedRoles = ['SUPER_ADMIN', 'STORE_OWNER', 'STORE_STAFF', 'CUSTOMER']
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." })
  }

  if (creatorRole === 'STORE_OWNER') {
    // Store Owners can only create Store Staff
    if (role !== 'STORE_STAFF') {
      return res.status(403).json({ message: "Store Owners can only create Store Staff accounts." })
    }
  } else if (creatorRole === 'SUPER_ADMIN') {
    // Super Admins can create Store Owners and Store Staff
    if (role !== 'STORE_OWNER' && role !== 'STORE_STAFF') {
      return res.status(403).json({ message: "Super Admins can only create Store Owners or Store Staff." })
    }
  } else {
    return res.status(403).json({ message: "Access denied. Insufficient permissions to create accounts." })
  }

  try {
    // 5. Check if email already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?"
    db_connection.query(checkQuery, [email], async (err, result) => {
      if (err) {
        console.error("Error checking email on user creation:", err)
        return res.status(500).json({ message: "Error checking user availability" })
      }

      if (result && result.length > 0) {
        return res.status(400).json({ message: "Email already exists" })
      }

      // 6. Hash password
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // 7. Insert the user into the database
      const insertQuery = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)"
      db_connection.query(insertQuery, [fullName, email, hashedPassword, role], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting user:", insertErr)
          return res.status(500).json({ message: "Error saving user account" })
        }

        return res.status(201).json({
          message: `${role.replace('_', ' ')} user registered successfully.`,
          user: {
            id: insertResult.insertId,
            fullName,
            email,
            role
          }
        })
      })
    })
  } catch (err) {
    console.error("General error during user creation:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  getUsers,
  createUser
}
