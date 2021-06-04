const {Model} = require('../helpers/models')
const taskModel = new Model('tasks')

exports.getTasks = async (req, res) => {
  try {
    const data = await taskModel.select('*')
    res.status(200).json({tasks: data.rows})
  } catch (error) {
    res.status(500).json({tasks: error.stack})
  }
}

exports.getTask = async (req, res) => {
  const id = req.params.id
  try {
    const data = await taskModel.select('*', ` JOIN projects ON project_id=${id} WHERE pid=${id}`)
    res.status(200).json({tasks: data.rows})
  } catch (error) {
    res.status(500).json({tasks: error.stack})
  }
}

exports.updateTask = async (req, res) => {
  const id = req.params.id
  try {
    await taskModel.update("ischeck", "true", id)
    res.status(200).json('Task updated')
  } catch (error) {
    res.status(500).json({tasks: error.stack})
  }
}

exports.createTask = async (req, res) => {
  const values = [`'${req.body.title_task}'`, "false", req.body.pid]
  const columns = 'title_task, ischeck, project_id'
  try {
    await taskModel.insert(columns, values)
    res.status(200).json("Berhasil menambahkan task")
  } catch (error) {
    res.status(500).json({tasks: error.stack})
  }
}