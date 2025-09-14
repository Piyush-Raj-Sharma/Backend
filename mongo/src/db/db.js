const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
// HOW server will be connected to mongoDB database
// we write that logic in db.js file

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

function connectDB() {
    mongoose.connect(dbURI)
    .then(() => {
        console.log("Database Connected");
    })
}

module.exports = connectDB;