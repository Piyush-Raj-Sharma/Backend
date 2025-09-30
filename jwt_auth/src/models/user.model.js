const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userModel = mongoose.model("user", userSchema);

model.exports = userModel;