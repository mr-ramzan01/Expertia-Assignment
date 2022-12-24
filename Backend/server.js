const app = require('./app');
const connection = require('./configs/database');
const PORT = 8080;

connection();
app.listen(PORT, () => {
  try {
    console.log('listening on port 8080');
  } catch (error) {
    console.log('not listening');
  }  
})