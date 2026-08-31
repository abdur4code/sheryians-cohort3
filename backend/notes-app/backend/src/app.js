const express = require('express');
const NotesModel = require('./models/notes.model');
const connectDB = require('./config/db');
const notesRoute = require('./routes/notes.routes');
const cors = require('cors');

const app = express();
connectDB();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}))

app.get('/', (req, res) => {
    res.send("I am live!");
})

app.use('/notes', notesRoute);

module.exports = app;