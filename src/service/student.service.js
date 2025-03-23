const connection = require('../database');
const { getRandomNumber } = require('../utils/randomId');

class StudentService {
  async create(name, age, grade) {
    const statement = `INSERT INTO student (id, name, age, grade) VALUES (?, ?, ?, ?);`
    console.log(statement, [name, age, grade]);
    const [res] = await connection.execute(statement, [getRandomNumber(), name, age, grade])

    return res
  }

  async list() {
    const statement = `SELECT * FROM student;`
    const [res] = await connection.execute(statement)

    return res
  }
}

module.exports = new StudentService()
