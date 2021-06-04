const massive = require('massive')
const { connectionStr, schema } = require('../config/db')

module.exports = async () => {
  const db = await massive(connectionStr, {
    allowedSchemas: [schema]
  })
  return {db}
}