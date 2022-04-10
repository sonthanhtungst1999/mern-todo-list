const express = require('express')
const router = express.Router()
const UsersController = require('../app/controllers/UsersController')
const verifyToken = require('../app/middlewares/AuthMiddleware')

//User router
router.get('/', verifyToken.isLogin, UsersController.handleCheckUserIsValid)
router.post('/login', UsersController.handleLogin)
router.post('/register', UsersController.handleRegister)

module.exports = router
