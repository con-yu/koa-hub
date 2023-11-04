const fs = require('fs')

function registerRouters(app) {
  // 读取当前文件夹所有route
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    // 遍历每个路由，依次注册
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

module.exports = {
  registerRouters
}
