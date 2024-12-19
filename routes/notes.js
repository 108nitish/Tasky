const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const authMiddleware = require('../middleware/authMiddleware');
const Note = require('../models/Note');

router.use(express.json());
router.use(authMiddleware);
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/notes', (req, res) => {
    if (!req.user) {
        return res.render('login', {user: null});
    }
    res.render('notes', { user: req.user });
});

router.get('/notes-provider', async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.ID });  
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/notes-provider', async (req, res) => {
    const note = new Note({
        user: req.user.ID, 
        content: req.body.content,
        createdAt: new Date() 
    });

    try {
        await note.save();
        res.status(201).json({ message: 'Note saved successfully!' }); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/delete-note/:id', async (req, res) => { 
    const noteId = req.params.id; 
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    } 
    try {
        const deletedNote = await Note.findByIdAndDelete(noteId); 
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        } 
        res.redirect('/notes');
    } catch (err) {
        res.status(400).json({ message: 'Invalid note ID' });
    }
});


module.exports = router;
