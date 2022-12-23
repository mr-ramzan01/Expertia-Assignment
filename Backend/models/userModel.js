const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
},{
    versionKey: false,
    timestamps: true
})

const Users = mongoose.model("users", userSchema);

module.exports = Users;