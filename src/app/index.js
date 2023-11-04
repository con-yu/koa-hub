const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { registerRouters } = require('../router')

const app = new koa()

app.use(bodyParser())
// 动态注册路由
registerRouters(app)

module.exports = app
