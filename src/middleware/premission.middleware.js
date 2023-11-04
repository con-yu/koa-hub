const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const permissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  // 获取用户登录的id 以及当前动态的id
  const { momentId } = ctx.params
  const { id } = ctx.user

  // 查询user的id是否有修改动态id的权限
  const isPermission = await permissionService.checkMoment(momentId, id)

  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  await next()
}

module.exports = {
  verifyPermission,
}
