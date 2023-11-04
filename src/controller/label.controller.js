const labelService = require('../service/label.service')
class LabelController {
  async create(ctx) {
    // 获取标签名称
    const { name } = ctx.request.body

    // 将标签数据插入到数据库中
    const res = await labelService.create(name)

    // 查看存储的结果
    ctx.body = {
      message: '创建标签成功！',
      data: res,
    }
  }

  async list(ctx) {
    const { offset, pageSize } = ctx.query
    const res = await labelService.queryList(offset, pageSize)

    ctx.body = {
      code: 200,
      data: res,
    }
  }
}

module.exports = new LabelController()
