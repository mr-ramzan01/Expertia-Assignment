const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.send("In home");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})
app.use('/users', userRouter);

module.exports = app;