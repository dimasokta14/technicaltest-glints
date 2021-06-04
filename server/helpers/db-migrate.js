const migrate = require('node-pg-migrate')
require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { connectionStr, schema} = require('../config/db')

const databaseUrl = connectionStr
const direction = 'up'
const dir = './migrations'
const migrationsTable = 'migrations'
const migrationsSchema = schema


const main = () => {
  console.log('Migrating database..')
  return migrate.default({
    databaseUrl,
    migrationsTable,
    migrationsSchema,
    schema,
    direction,
    dir
  })
}

if (require.main === module) {
  main()
} else {
  module.exports = main
}