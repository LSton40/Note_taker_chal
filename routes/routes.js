const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../db/db.json');
const {v4 : uuidv4} = require('uuid');
const db_path = path.join(__dirname, '../db/db.json');

//Function to read db.json file
function retrieveNotes() {
    return fs.promises.readFile(db_path, 'utf-8')
        .then(data => JSON.parse(data));
}

//Function to add data to db.json file
function appendNote(note_data) {
    return fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
}

//Loads index.html at root
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))    
})

//Loads notes.html at /notes URL
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//GET request to read notes from db.json file for client view
router.get('/api/notes', (req, res) => {
    retrieveNotes()
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
});

//POST request to save notes to db.json with a unique identifier (id)
router.post('/api/notes', (req, res) => {
    retrieveNotes()
        .then(note_data => {

            const new_note = req.body;
            new_note.id = uuidv4();
            note_data.push(new_note);

            appendNote(note_data)
                .then(() => res.json(note_data))
                .catch(err => console.log(err));
        }) 
});

//DELETE request to delete notes from db.json based on id
router.delete('/api/notes/:id', (req, res) => {
    retrieveNotes()
        .then(note_remain => {

            const id = req.params.id;
            note_remain = note_remain.filter((element) => element.id !== id)

            appendNote(note_remain)
                .then(() => res.json(note_remain))
                .catch(err => console.log(err));
        })
})

module.exports = router;