const koaRouter = require('@koa/router')
const {create, showAvatarImage} = require('../controller/user.controller')
const { verifySignUp, encryptPassword } = require('../middleware/user.middleware')

const userRouter = new koaRouter({ prefix: '/users' })

// 用户注册
userRouter.post('/', verifySignUp, encryptPassword, create)
// 为用户提供头像
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter
