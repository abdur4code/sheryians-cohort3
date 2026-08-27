const NotesModel = require("../models/notes.model");

const createNotesController =  async (req, res) => {
    try {
        let body = req.body;
        let newNote = await NotesModel.create(body);

        return res.status(201).json({
            message: "Note Created!",
            data: newNote,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error in create notes API:`
        })
    }
}

const getAllNotesController = async (req, res) => {
    try {
        const allNotes = await NotesModel.find();

        return res.status(200).json({
            message: "All notes fetched",
            data: allNotes,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error in get allNotes API:`
        })
    }
}

const getSingleNotesController = async (req, res) => {
    try {
        let noteId = req.params.id;
        let singleNote = await NotesModel.findById(noteId);

        return res.status(200).json({
            message: "Single note fetched",
            data: singleNote,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error in get single notes API:`
        })
    }
}

const updateNotesController = async (req, res) => {
    try {
        let noteId = req.params.id;
        let body = req.body;

        let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
            new: true
        });

        return res.status(200).json({
            message: "Note Updated",
            data: updatedNote,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error in update notes API`
        })
    }
}

const singleEntityUpdateController = async (req, res) => {
    try {
        let noteId = req.params.id;
        let body = req.body;

        let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
            new: true
        })

        return res.status(200).json({
            message: "Notes Updated",
            data: updatedNote
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in single patch notes API: "
        })
    }
}

const deleteNotesController = async (req, res) => {
    try {
        let noteId = req.params.id;
        await NotesModel.findByIdAndDelete(noteId);

        return res.status(200).json({
            message: "Note Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in delete notes API: "
        })
    }
}

module.exports = {
    createNotesController,
    getAllNotesController,
    getSingleNotesController,
    updateNotesController,
    deleteNotesController,
    singleEntityUpdateController 
}