const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx) {
    // 获取评论内容
    const { content, momentId } = ctx.request.body
    // 获取评论发布者
    const { id } = ctx.user
    // 评论相关信息保存在数据库
    const res = await commentService.create(content, momentId, id)

    console.log(res, 'resss')
    ctx.body = {
      code: 200,
      message: '创建评论成功',
      data: res,
    }
  }
  async reply(ctx) {
    // 获取评论内容
    const { content, momentId, commentId } = ctx.request.body
    // 获取评论发布者
    const { id } = ctx.user

    // 评论相关信息保存在数据库
    const res = await commentService.reply(content, momentId, commentId, id)

    ctx.body = {
      code: 200,
      message: '回复评论成功',
      data: res,
    }
  }
}

module.exports = new CommentController()
