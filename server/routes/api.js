const express = require('express')
const router = express.Router()
const {projectController, taskController,} = require('../controllers')
const auth = require('../middleware/auth')

// PROJECT
router.get('/projects', projectController.getProjects)
router.get('/projects/:id', projectController.getProject)

// TASK
router.get('/tasks', taskController.getTasks)
router.get('/tasks/:id', taskController.getTask)
router.post('/tasks/:id', taskController.updateTask)
router.post('/tasks', taskController.createTask)

module.exports = router