const koaRouter = require('@koa/router')
const { create, list } = require('../controller/student.controller')

const studentRouter = new koaRouter({ prefix: '/student' })

// 新增学生
studentRouter.post('/create', create)
// 学生列表
studentRouter.post('/list', list)


module.exports = studentRouter
