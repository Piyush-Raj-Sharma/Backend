const mongoose = require('mongoose');

// HOW server will be connected to mongoDB database
// we write that logic in db.js file

function connectDB() {
    mongoose.connect("mongodb+srv://gyaaandigital_db_user:xgTZyUNYzlgN0x3u@cluster0.4rszmup.mongodb.net/cohort")
    .then(() => {
        console.log("Database Connected");
    })
}

module.exports = connectDB;