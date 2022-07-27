const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../db/db.json');
const {v4 : uuidv4} = require('uuid');

const db_path = path.join(__dirname, '../db/db.json');


function retrieveNotes() {
    return fs.promises.readFile(db_path, 'utf-8')
        .then(data => JSON.parse(data));
}

function appendNote(note_data) {
    return fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
        .then(() => res.json(note_data))
        .catch(err => console.log(err));
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))    
})

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

router.get('/api/notes', (req, res) => {
    retrieveNotes()
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
});


router.post('/api/notes', (req, res) => {
    retrieveNotes()
        .then(note_data => {
            const new_note = req.body;

            const reference_id = uuidv4();
            new_note.id = reference_id;

            data.push(new_note);

            appendNote(note_data)
        })
    
});


router.delete('/api/notes', (req, res) => {
    retrieveNotes()
        .then(note => {
            const id = req.body.id;
            const noteObj = note.find(del_note => del_note.id === id);
            const index = note.indexOf(noteObj);

            note.splice(index, 1);

            appendNote(note)
          

        })
})


module.exports = router;