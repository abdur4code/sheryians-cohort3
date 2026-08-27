const express = require("express");
const {
    createNotesController,
    getAllNotesController,
    getSingleNotesController,
    updateNotesController, 
    deleteNotesController} = require("../controllers/notes.controller");

const router = express.Router()

router.post('/create', createNotesController);
router.get('/allNotes', getAllNotesController);
router.get('/:id', getSingleNotesController);
router.put('/:id', updateNotesController);
router.delete('/:id', deleteNotesController);

module.exports = router;