const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, detail, update, del } = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/premission.middleware')
const { verifyLabelExist } = require('../middleware/label.middleware')

const momentRouter = new koaRouter({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyAuth, create)
// 获取动态
momentRouter.get('/', list)
// 获取动态详情
momentRouter.get('/:momentId', detail)
// 删除动态
// 必须登录并且登录用户为动态发布者
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, del)
// 修改动态
// 同删除动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

// 添加标签
/**
 * 中间件
 * 1.是否登录
 * 2.是否本人
 * 3.额外中间件：验证label的name是否已经存在于label表中
 *    - 如果存在，直接使用即可
 *    - 如果不存在，先将此name添加到label表
 * 4.最终步骤
 *    - 所有的labels都已存在label表中
 *    - 动态2，和labels关系，添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, (ctx) => {
  console.log(ctx.request.body)
  ctx.body = 'iiii'
})
module.exports = momentRouter
