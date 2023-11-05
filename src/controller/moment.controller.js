const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx) {
    // 获取动态内容
    const { content } = ctx.request.body

    // 获取动态发布者
    const { id } = ctx.user

    // 将动态相关信息保存在数据库
    const res = await momentService.create(content, id)

    ctx.body = {
      code: 200,
      message: '创建动态成功',
      data: res,
    }
  }
  async list(ctx) {
    const { offset, pageSize } = ctx.query
    const res = await momentService.queryList(offset, pageSize)

    ctx.body = {
      code: 200,
      data: res,
    }
  }

  async detail(ctx) {
    const { momentId } = ctx.params
    const res = await momentService.queryMomentById(momentId)

    ctx.body = {
      code: 200,
      data: res[0],
    }
  }

  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const res = await momentService.updateMoment(content, momentId)

    ctx.body = {
      code: 200,
      message: '修改动态成功！',
      data: res,
    }
  }

  async del(ctx) {
    const { momentId } = ctx.params
    const res = await momentService.delMoment(momentId)

    ctx.body = {
      code: 200,
      message: '删除动态成功！',
      data: res,
    }
  }

  async addLabels(ctx) {
    const { labels } = ctx
    const { momentId } = ctx.params

    try {
      for (const label of labels) {
        const hasLabel = await momentService.hasLabel(momentId, label.id)
        if (!hasLabel) {
          // 如果comment和label关系不存在，建立关系
          const res = await momentService.addLabel(momentId, label.id)
        }

        ctx.body = {
          code: 200,
          message: '添加标签成功！',
        }
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: '为标签添加失败！',
      }
    }
  }
}

module.exports = new MomentController()
