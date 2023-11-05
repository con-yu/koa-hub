const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middware')
const { create } = require('../controller/file.controller')

const fileRouter = new koaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, handleAvatar, create)
module.exports = fileRouter
