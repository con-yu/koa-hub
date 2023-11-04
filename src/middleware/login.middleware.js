const jwt = require('jsonwebtoken')
const { NULL_VALUE, NOT_EXISTS, PASSWORD_INCORRECT, UNAUTHORIZATION } = require('../config/error')
const { PUBLIC_KEY } = require('../config/secret')
const userService = require('../service/user.service')
const { md5password } = require('../utils/md5password')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NULL_VALUE, ctx)
  }

  // 查询该用户是否在数据库存在
  const users = await userService.getUserByName(name)
  const [user] = users

  if (!user) {
    return ctx.app.emit('error', NOT_EXISTS, ctx)
  }

  // 查询数据库中的密码是否与输入的密码一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_INCORRECT, ctx)
  }

  // 将user对象保存至ctx
  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 2.验证token
  try {
    // 获取token中的信息
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })

    ctx.user = res
    // 执行下一个中间件
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
