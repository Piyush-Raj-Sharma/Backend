const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title : String,
    content : String
})

const noteModal = new mongoose.model('note', noteSchema);

module.exports = noteModal;

