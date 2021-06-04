const passport = require('passport')
const auth = require('../middleware/auth')
const {userController} = require('../controllers')

require('dotenv').config()

exports.register = async (req,res) => {
  const {username, email, password} = req.body
  password = auth.createHash(password)

  const user = await userController.createUser(username, email, password)
  const token = auth.signUser(user)
  return res.json({user, token})

}

exports.login = async (req, res) => {
  passport.authenticate('local', {session: false}, (authError, user) => {
    if(authError || !user) {
      res.status(401).json({info: 'Tidak terautentikasi ...'})
      return
    }

    req.logIn(user, {session: false}, (loginError) => {
      if(loginError){
        res.send(loginError)
      }else{
        const token = auth.signUser(user)
        res.json({ user, token})
      }
    })
  })(req, res)
}