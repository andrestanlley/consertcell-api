const express = require('express')
const users = require('../controllers/users')
const router = express.Router()

router.post('/login', users.login)
router.post('/register', users.register)

module.exports = router