const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')

class LoginController {
  sign(ctx) {
    // 获取用户信息
    const { id, name } = ctx.user

    // 颁发令牌，传入token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 30 * 24 * 60 * 60,
      algorithm: 'RS256', // RS256算法最小密钥长度为2048
    }) 

    // 返回用户信息
    ctx.body = {
      code: 200,
      message: '登录成功!',
      data: {
        id,
        name,
        token,
      },
    }

  }

  // 测试登录
  test(ctx, next){
    ctx.body = `验证身份通过`

    next()
    
  }
}

module.exports = new LoginController()
