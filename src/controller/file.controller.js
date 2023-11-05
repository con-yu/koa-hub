const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {SERVER_HOST, SERVER_PORT} = require('../config/server')

class FileController {
  async create(ctx) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 存储在avatar表
    fileService.create(filename, mimetype, size, id)

    // 存储在user表
    const avatar_url = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    await userService.updateUserAvatar(avatar_url, id)

    ctx.body = {
      code: 200,
      message: '头像上传成功！',
      avatar_url
    }
  }
}

module.exports = new FileController()
