const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: String,
        default: new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ')
    }
},{
    versionKey: false,
    timestamps: true
})

const Tasks = mongoose.model("tasks", taskSchema);
module.exports = Tasks;