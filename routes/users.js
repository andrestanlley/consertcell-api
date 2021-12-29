const express = require('express')
const users = require('../controllers/users')
const login = require('../middleware/login')
const router = express.Router()

router.post('/login', users.login)
router.post('/register', login, users.register)

module.exports = router