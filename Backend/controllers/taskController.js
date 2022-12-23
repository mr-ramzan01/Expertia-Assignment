const Tasks = require("../models/taskModel");

async function addTask(req, res) {
    try {
        let prevTasks = await Tasks.find({$and: [{userId: req.body.userId}, {date: new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ')}]})
        if(prevTasks.length >= 5) {
            return res.send({
                success: false,
                message: "Daily limit exceeded"
            })
        }
        let task = await Tasks.create(req.body);
        res.status(200).send({
            success: true,
            message: 'Task added successfully',
            data: task
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


async function getTasks(req, res) {
    try {
        const {id} = req.params;
        let tasks = await Tasks.find({userId: id});
        res.status(200).send({
            success: true,
            data: tasks
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { addTask, getTasks };