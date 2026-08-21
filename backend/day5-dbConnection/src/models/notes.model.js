const mongoose = require('mongoose');

let notesSechema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
    }
})

const NotesModel = mongoose.model('notes', notesSechema);

module.exports = NotesModel;