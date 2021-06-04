const faker = require('faker')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config();

const DB = require('./db')
const auth = require('../middleware/auth')

const tableProjects = 'projects'
const tableUsers = 'users'
const tableTasks = 'tasks'
const projectDummies = ['Corporate Website', 'eBelanja', 'Social Media']
const taksDummies = ['Metting with team', 'Meeting with client', 'Project Initiation', 'Story Board', 'Deployment']


const connectDB = () => {
  console.log('connecting to database ...')
  return DB()
}


const generateProjectData = (db, table, user) => db[table].insert({
  title: faker.helpers.randomize(projectDummies),
  user_id: user.uid
})

const generateTaskData = (db, table, project) => db[table].insert({
  title_task: faker.helpers.randomize(taksDummies),
  ischeck: false,
  project_id: project.pid
})

const seedingProjectTable = (db, users) => {
  console.log('Seeding projects table...')
  const projectData = []
  let i = 0

  try {
    while(i < 2){
      const user = users[_.random(users.length - 1)]
      projectData.push(generateProjectData(db, tableProjects, user))
      i++
    }
  } catch (error) {
    throw error
  }

  return Promise.all(projectData).then((projects) => seedingTaskTable(db, projects))
}

const seedingTaskTable = (db, projects) => {
  console.log('Seeding tasks table ...')
  const taskData = []
  let i = 0

  try {
    while(i < 5){
      const project = projects[_.random(projects.length - 1)]
      taskData.push(generateTaskData(db, tableTasks, project))
      i++
    }
  } catch (error) {
    throw error
  }

  return Promise.all(taskData)
}

const seedingUserData = (db) => {
  console.log('Seeding users table ...')
  const users = [{
    email: 'user@mail.com',
    password: auth.createHash('password'),
    email_verified: true,
    username: faker.internet.userName()
  }];

  return db[tableUsers].insert(users)
}

const createJwt = async (users) => {
  let user = users.map((data) => {
    return data.uid
  }) 
  try {
    if(!user) return console.log('Nampaknya ada yang salah')
    let token = jwt.sign({uid: user}, process.env.JWT_SECRET, {
      expiresIn: 86400
    })
    console.log({auth: true, token: token})
  } catch (error) {
    throw error 
  }
}

const seeding = (db) => {
  return seedingUserData(db)
    .then(users => seedingProjectTable(db, users))
    .then(users => createJwt(users))
    .then(() => {
      console.log('Seeding complete..')
    })
    .catch((err) => {
      console.log(err)
    })
}

if(require.main === module) {
  connectDB().then(db => seeding(db.db))
} else {
  module.exports = {
    connectDB, seeding
  }
}