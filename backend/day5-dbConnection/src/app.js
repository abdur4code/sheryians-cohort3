const express = require('express');
const connectDb = require('./config/db');
const NotesModel = require('./models/notes.model');

const app = express();

app.use(express.json());

connectDb();

app.get('/', (req, res) => {
    res.send("I am the Server!");
})

app.post('/create', async (req, res) => {
    let {title, description} = req.body;
    let newNotes = await NotesModel.create({
        title,
        description,
    })
    res.send({
        success: true,
        message: "Notes Created Successfully",
        data: newNotes,
    })
})
module.exports = app;