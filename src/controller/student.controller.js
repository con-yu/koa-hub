const studentService = require('../service/student.service')

class StudentController {
  async create(ctx) {
    const { name, age, grade } = ctx.request.body
    await studentService.create(name, age, grade)

    ctx.body = {
      code: 200,
      message: '创建学生成功',
      data: 'OK',
    }
  }

  async list(ctx){
    const res = await studentService.list()
    // return res

    ctx.body = {
      code: 200,
      message: '查询学生列表成功',
      data: res
    }

  }
}

module.exports = new StudentController()
