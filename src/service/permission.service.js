const connection = require('../database')

class PremissionService {
  async checkMoment(momentId, userId) {
    // 拼接statement
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?; `

    // 执行sql语句
   const [res] = await connection.execute(statement, [momentId, userId])
   return !!res.length
  } 
}

module.exports = new PremissionService()
