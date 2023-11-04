const connection = require('../database')

class MomentService {
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const [res] = await connection.execute(statement, [content, userId])

    return res
  }

  async queryList(offset = 0, pageSize = 10) {
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
    (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount
    FROM moment m 
    LEFT JOIN user u ON u.id = m.user_id
    LIMIT ?, ?;`
    const [res] = await connection.execute(statement, [String(offset), String(pageSize)])

    return res
  }

  async queryMomentById(id) {
    const statement = `SELECT
    	m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    	JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
    	(
    		JSON_ARRAYAGG(JSON_OBJECT(
    		'id', c.id, 'content', c.content, 'commentId', c.comment_id,
        'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
    		))
    	) comments 
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LEFT JOIN comment c ON c.moment_id = m.id 
    LEFT JOIN user cu ON cu.id = c.user_id
    WHERE m.id = ?
    GROUP BY m.id;`
    const [res] = await connection.execute(statement, [id])

    return res
  }

  async updateMoment(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [content, id])

    return res
  }

  async delMoment(id) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [res] = await connection.execute(statement, [id])

    return res
  }
}

module.exports = new MomentService()
