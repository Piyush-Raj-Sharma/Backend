const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title : String,
    content : String
})

const noteModal = new mongoose.Model('note', noteSchema);

module.exports = noteModal;

