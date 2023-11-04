const { NULL_VALUE, DUPLICATE_NAME } = require('../config/error')
const userService = require('../service/user.service')
const { md5password } = require('../utils/md5password')

const verifySignUp = async (ctx, next) => {
  const user = ctx.request.body
  const { name, password } = user

  // 验证信息是否有效
  // 1.非空验证
  if (!name || !password) {
    return ctx.app.emit('error', NULL_VALUE, ctx)
  }
  // 2.重名验证
  const users = await userService.getUserByName(name)
  if (users.length > 0) {
    return ctx.app.emit('error', DUPLICATE_NAME, ctx)
  }

  // 🆗👇
  await next()
}

const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = {
  verifySignUp,
  encryptPassword,
}
