const { queryLabelByName, create } = require('../service/label.service')

const verifyLabelExist = async (ctx, next) => {
  const { labels } = ctx.request.body
  // 判断labels中的所有标签是否均已存在label表
  const newLabels = []
  for (const name of labels) {
    const res = await queryLabelByName(name)
    const labelObj = {name}
    if (res) { // 存在，获取label对应的id
      labelObj.id = res.id
    } else { // 插入name并获取id
      const insertRes = create(name)
      labelObj.id = insertRes.insertId
    }

    newLabels.push(labelObj)
  }

  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExist,
}
