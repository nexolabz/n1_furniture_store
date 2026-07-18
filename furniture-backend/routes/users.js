const express = require('express')
const router = express.Router()
const { getUsers, createUser } = require('../controllers/userController')
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// Both SUPER_ADMIN and STORE_OWNER can access user listing and creation
router.get('/', verifyToken, authorizeRoles('SUPER_ADMIN', 'STORE_OWNER'), getUsers)
router.post('/create', verifyToken, authorizeRoles('SUPER_ADMIN', 'STORE_OWNER'), createUser)

module.exports = router
