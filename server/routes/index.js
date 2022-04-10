const userRouter = require('./users')
const postRouter = require('./posts')
const verifyToken = require('../app/middlewares/AuthMiddleware')

function route(app) {
  app.use('/api/user', userRouter)
  app.use('/api/post', verifyToken.isLogin, postRouter)
}

module.exports = route
