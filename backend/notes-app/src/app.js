const express = require('express');
const NotesModel = require('./models/notes.model');
const connectDB = require('./config/db');
const notesRoute = require('./routes/notes.routes');

const app = express();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("I am live!");
})

app.use('/notes', notesRoute);

module.exports = app;