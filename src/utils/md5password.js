const crypto = require('crypto')

const md5password = (password) => {
  const md5 = crypto.createHash('md5')
  const md5pwd = md5.update(password).digest('hex') // 转化为16进制

  return md5pwd  
}

module.exports = {
  md5password
}
