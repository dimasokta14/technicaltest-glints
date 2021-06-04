const {Model} = require('../helpers/models')

const User = new Model('users')

exports.getUser = async (req, res) => {
  const id = req.params.id
  try {
    const data = await User.select('*', ` WHERE uid=${id}`)
    res.status(200).json({users: data.rows})
  } catch (error) {
    res.status(200).json({users: error.stack})
  }
}

exports.getUserByEmail = async (req, res) => {
  const email = req.params.email
  try {
    const data = await User.select('*', ` WHERE email=${email}`)
    res.status(200).json({users: data.rows})
  } catch (error) {
    res.status(200).json({users: error.stack})
  }
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    await User.delete(` WHERE uid=${id}`)
    res.status(200).json('user deleted')
  } catch (error) {
    res.status(200).json({users: error.stack})
  }
}

exports.createUser = async (req, res, username, email, password) => {
  const columns = 'username, email, emailVerified, password'
  const values = `'${username}', '${email}', true, '${password}'`

  try {
    const data = await User.insert(columns, values)
    res.status(200).json({users: data.rows})
  } catch (error) {
    res.status(500).json({users: error.stack})
  }
}