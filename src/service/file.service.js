const connection = require('../database')

class FIleService {
  async create(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size,  user_id) VALUES (?, ?, ?, ?);`
    const [res] = await connection.execute(statement, [filename, mimetype, size, userId])

    return res
  }
}

module.exports = new FIleService()
