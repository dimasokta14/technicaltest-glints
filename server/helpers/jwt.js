const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const _ = require('lodash')
require('dotenv').config()

module.exports = (app) => {
  return new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }),
  async (jwtPayload, cb) => {
    try {
      const user = await users.getSingleUser(jwtPayload.uid)
      cb(null, _.omit(user, 'password'))
    } catch (error) {
      cb(error)
    }
  }
}