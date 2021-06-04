const {Model} = require('../helpers/models')

const projectModel = new Model('projects')

exports.getProjects = async (req, res) => {
  try {
    const data = await projectModel.select('*')
    res.status(200).json({projects: data.rows})
  } catch (error) {
    res.status(500).json({projects: error.stack})
  }
}

exports.getProject = async (req, res) => {
  const id = req.params.id
  try {
    const data = await projectModel.select('*', ` RIGHT JOIN tasks ON tasks.project_id=${id} WHERE pid=${id}`)
    res.status(200).json({projects: data.rows})
  } catch (error) {
    res.status(500).json({projects: error.stack})
  }
}

exports.createProject = async (req, res) => {
  const {title} = req.body
  const columns = 'title, user_id'
  const values = `'${title}'`

  try {
    const data = await projectModel.insert(columns, values)
    res.status(200).json({projects: data.rows})
  } catch (error) {
    res.status(500).json({projects: error.stack})
  }
}
