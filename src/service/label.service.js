const connection = require('../database')

class LabelService {
  async create(name) {

    // 拼接statement
    const statement = `INSERT INTO label (name) VALUES (?);`

    // 执行sql语句
   const [res] = await connection.execute(statement, [name])
   return res
  }

  async queryLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [res] = await connection.execute(statement, [name])

    return res[0]
  }


}

module.exports = new LabelService()
