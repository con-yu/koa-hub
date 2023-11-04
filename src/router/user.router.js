const koaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifySignUp, encryptPassword } = require('../middleware/user.middleware')

const userRouter = new koaRouter({ prefix: '/users' })

// 用户注册
userRouter.post('/', verifySignUp, encryptPassword, userController.create)

module.exports = userRouter
