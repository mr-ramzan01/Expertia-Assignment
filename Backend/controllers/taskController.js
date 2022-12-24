const Tasks = require("../models/taskModel");

async function addTask(req, res) {
    try {
        //getting all previous tasks
        let prevTasks = await Tasks.find({$and: [{userId: req.body.userId}, {date: new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ')}]})
        
        // if previous tasks are already 5 then showing limit exceeded
        if(prevTasks.length >= 5) {
            return res.send({
                success: false,
                message: "Daily limit exceeded"
            })
        }

        // adding task to database
        let task = await Tasks.create(req.body);
        res.status(200).send({
            success: true,
            message: 'Task added successfully',
            data: task
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


async function getTasks(req, res) {
    try {
        const {id} = req.params;
        // finding all tasks
        let tasks = await Tasks.find({userId: id});
        res.status(200).send({
            success: true,
            data: tasks
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { addTask, getTasks };