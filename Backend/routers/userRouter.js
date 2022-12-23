const express = require('express');
const { SignUPUser, LoginUser, isLoggedInUser } = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/signup', SignUPUser);
userRouter.post('/login', LoginUser);
userRouter.get('/getUsers/:token', isLoggedInUser);

module.exports = userRouter;