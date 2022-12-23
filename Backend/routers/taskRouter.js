const express = require('express');
const { addTask, getTasks } = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.get('/:id', getTasks);
taskRouter.post('/add', addTask);

module.exports = taskRouter;