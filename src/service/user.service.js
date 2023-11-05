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

  async getAvatarByUserId(userId) {
    // 拼接statement
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`

    // 执行sql语句
    const [res] = await connection.execute(statement, [userId])
    return res.pop()
  }

  async updateUserAvatar(avatarUrl, userId) {
    // 拼接statement
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`

    // 执行sql语句
    const [res] = await connection.execute(statement, [avatarUrl, userId])
    return res
  }
}

module.exports = new UserService()
