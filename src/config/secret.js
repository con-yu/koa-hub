const fs = require('fs')
const path = require('path')

// 默认情况下相对目录和node的启动目录有关
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
}
