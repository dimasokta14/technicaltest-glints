const {pool} = require('./pool')




class Model {
  constructor(table) {
    this.pool = pool
    this.table = table
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`)
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`
    if(clause) query += clause
    return this.pool.query(query)
  }

  async insert(columns, values){
    let query = `
      INSERT INTO ${this.table} (${columns})
      VALUES (${values});
    `
    console.log(query)
    return this.pool.query(query)
  }

  async update(columns, values, id){
    let query = `
      UPDATE ${this.table} 
      SET ${columns}=${values}
      WHERE tid = ${id};
    `
    return this.pool.query(query)
  }

  async delete(clause){
    let query =`
      DELETE from ${this.table}
    `
    if(clause) query += clause
    return this.pool.query(query)
  }
}


module.exports = {
  Model: Model
}