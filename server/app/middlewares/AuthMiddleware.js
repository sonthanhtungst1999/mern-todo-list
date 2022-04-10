const jwt = require('jsonwebtoken')

class authentication {
  async isLogin(req, res, next) {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    // console.log('Token ma server nhan duoc: ' + token)
    if (!token)
      return res.status(403).json({ success: false, message: 'Login required' })

    try {
      const decoded = jwt.verify(token, process.env.ACCESSTOKEN_TOKEN_SECRET)
      req.userId = decoded.userId
      next()
    } catch (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' })
    }
  }
}

module.exports = new authentication()
