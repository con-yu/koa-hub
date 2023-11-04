const userService = require('../service/user.service')
class UserController {
  async create(ctx) {
    // 获取用户信息
    const user = ctx.request.body

    // 将user数据插入到数据库中
    const res = await userService.create(user)

    // 查看存储的结果
    ctx.body = {
      message: '创建用户成功！',
      data: res,
    }
  }
}

module.exports = new UserController()
