const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')

class UsersController {
  // @router /api/user
  // @desc Check if user is logged in
  // @access Public
  async handleCheckUserIsValid(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId }).select('-password')
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'User not found' })
      }
      //all good
      res.json({ success: true, user })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ success: false, message: 'Interal server error' + err })
    }
  }

  // [POST] /api/user/register
  async handleRegister(req, res) {
    const { username, password, confirmPassword } = req.body

    //Validation missing username or password
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: 'Missing username or password !!!' })

    //Validation compare password vs confirmPassword
    if (username && password !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: 'Confirm password and password are not same',
      })

    try {
      //Validation invalid user
      const user = await User.findOne({ username })
      if (user)
        return res
          .status(400)
          .json({ success: false, message: 'Username is already taken' })

      //All good
      const hashPassword = await argon2.hash(password)
      const newUser = new User({
        username,
        password: hashPassword,
      })
      await newUser.save()

      //Return access token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESSTOKEN_TOKEN_SECRET
      )
      res.json({
        success: true,
        message: 'User created successfully',
        accessToken,
      })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error database ' + err })
    }
  }

  // [POST] /api/user/login
  async handleLogin(req, res) {
    const { username, password } = req.body

    //Validation missing username or password
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: 'Missing username or password !!!' })

    try {
      const user = await User.findOne({ username })
      //Validation username
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect username or password' })
      const passwordValidation = await argon2.verify(user.password, password)
      //Validation password
      if (!passwordValidation)
        return res.status(400).json({
          success: false,
          message: 'Incorrect username or password !!!',
        })
      //All good
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESSTOKEN_TOKEN_SECRET
      )
      res.json({
        success: true,
        message: 'Logged successfully !!!',
        accessToken,
      })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error database ' + err })
    }
  }
}

module.exports = new UsersController()
