const fs = require('fs')
const userService = require('../service/user.service')
const { UPLOAD_PATH } = require('../config/path')
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
  async showAvatarImage(ctx) {
    const { userId } = ctx.params
    const res = await userService.getAvatarByUserId(userId)
    if (!res) {
      ctx.body = '该用户未上传头像'
      return
    }
    // 读取头像所在的文件
    const { filename, mimetype } = res

    // 设置图片类型，防止浏览器当做一般文件下载
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`./${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
