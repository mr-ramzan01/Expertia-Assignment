const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;



const connection = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(`mongodb+srv://${db_username}:${db_password}@${db_url}/expertia_data?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((data) => {
        console.log('connected with server')
    })
    .catch(() => {
        console.log('error connecting to server')
    })
}

module.exports = connection;