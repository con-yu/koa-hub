const connection = require('../database')

class UserService {
  async create(user) {
    // 获取用户信息
    const { name, password } = user

    // 拼接statement
    const statement = `INSERT INTO user (name,password) VALUES (?, ?);`

    // 执行sql语句
   const [res] = await connection.execute(statement, [name, password])
   return res
  }

  async getUserByName(name) {
    // 拼接statement
    const statement = `SELECT * FROM user WHERE name = ?;`

    // 执行sql语句
    const [users] = await connection.execute(statement, [name])
    return users
  }
}

module.exports = new UserService()
