const db_connection = require('../config/db_config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return token
}

const handleRegister = async (req, res) => {
  const { fullName, name, email, password } = req.body
  const actualName = fullName || name

  if (!actualName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    // 1. Check if email already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?"
    db_connection.query(checkQuery, [email], async (err, result) => {
      if (err) {
        console.error("Error checking email:", err)
        return res.status(500).json({ message: "Error checking email" })
      }
      
      if (result && result.length > 0) {
        return res.status(400).json({ message: "Email already exists" })
      }

      // 2. Hash the password
      try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // 3. Insert the new user into the database
        const insertQuery = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)"
        db_connection.query(insertQuery, [actualName, email, hashedPassword], (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting user:", insertErr)
            return res.status(500).json({ message: "Error registering user" })
          }

          // Generate token for the new user
          const userId = insertResult.insertId
          const token = generateToken(userId)

          return res.status(201).json({
            message: "User registered successfully",
            token: token,
            user: {
              id: userId,
              name: actualName,
              email: email
            }
          })
        })
      } catch (hashErr) {
        console.error("Hashing error:", hashErr)
        return res.status(500).json({ message: "Internal server error" })
      }
    })
  } catch (err) {
    console.error("Registration general error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    const checkQuery = "SELECT * FROM users WHERE email = ?"
    db_connection.query(checkQuery, [email], async (err, result) => {
      if (err) {
        console.error("Error checking email on login:", err)
        return res.status(500).json({ message: "Error checking email" })
      }

      if (!result || result.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" })
      }

      const userRow = result[0]

      // Compare password with hashed password using bcrypt.compare
      const passwordMatch = await bcrypt.compare(password, userRow.password)

      if (passwordMatch) {
        const token = generateToken(userRow.id)
        return res.status(200).json({
          success: true,
          token: token,
          user: {
            id: userRow.id,
            name: userRow.full_name,
            email: userRow.email,
            role: userRow.role
          }
        })
      } else {
        return res.status(400).json({ message: "Invalid email or password" })
      }
    })
  } catch (err) {
    console.error("Login general error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  handleRegister,
  handleLogin
}