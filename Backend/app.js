const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  try {
    res.send("In home");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

module.exports = app;