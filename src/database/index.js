// const mysql = require('mysql2')
import mysql from 'mysql2'

// 创建连接池
const connectionPool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  port: 3306,
  database: 'test',
  password: '147258369tx',
  connectionLimit: 5,
})

// 测试连接
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败', err)
    return
  }
  connection.connect((err) => {
    if (err) {
      console.log('连接数据库失败 ❌', err)
    } else {
      console.log('连接数据库成功 🎉')
    }
  })
})

// 获取连接对象
const connection = connectionPool.promise()

module.exports = connection
