const app = require('../app')
const { NULL_VALUE, DUPLICATE_NAME, NOT_EXISTS, PASSWORD_INCORRECT, UNAUTHORIZATION, OPERATION_IS_NOT_ALLOWED } = require('../config/error')

app.on('error', (err, ctx) => {
  let code = 0
  let message = ''
  switch (err) {
    case NULL_VALUE:
      code = -1001
      message = '用户名或密码不能为空！'
      break
    case DUPLICATE_NAME:
      code = -1002
      message = '该用户名已被占用！'
      break
    case NOT_EXISTS:
      code = -1003
      message = '该用户名不存在！'
      break
    case PASSWORD_INCORRECT:
      code = -1004
      message = '密码错误！'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token!'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = '未授权的操作!'
      break

    default:
      break
  }

  ctx.body = { code, message }
})
