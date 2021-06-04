const {Pool} = require('pg')
const {connectionStr} = require('../config/db')
require('dotenv').config()

const pool = new Pool({connectionString: connectionStr})

module.exports = {pool}



