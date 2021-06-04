const LocalStrategy = require('passport-local').Strategy
const _ = require('lodash')
const auth = require('../middleware/auth')

module.exports = (app) => {
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = await users.getSingleByEmail(email)
      if(!user || !auth.checkPassword(password, user.password)) {
        cb(null, false, {message: 'email atau password salah'})
        return
      }
      cb(null, _.omit(user, 'password'), {})
    } catch (error) {
      cb(error)
    }
  }
  )
}