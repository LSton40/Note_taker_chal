const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../db/db.json');
// const {v4 : uuidv4} = require('uuid');


function retrieveNotes() {
    return fs.promises.readFile(path.join(__dirname, '../db/db.json'), 'utf-8')
        .then(data => JSON.parse(data));
}

function appendNote(data) {
    return fs.promises.appendFile(path.join(__dirname, '../db/db.json'), data)
}

function notesPage() {
    return fs.promises.readFile(path.join(__dirname, '../public/notes.html'), 'utf-8')
        // .then(data => JSON.parse(data))
}

function indexPage() {
    return fs.promises.readFile(path.join(__dirname, '../public/index.html'), 'utf-8')
        // .then(data => JSON.parse(data))
}


router.get('/notes', () => {
    notesPage()
        // .then(data => {
        //     res.json(data)
        // })
        // .catch(err => console.log(err))
})

router.get('/', () => {
    indexPage()
        // .then(data => {
        //     res.json(data)
        // })
        // .catch(err => console.log(err))
    
})

router.get('/api/notes', (req, res) => {
    retrieveNotes()
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
});


router.post('/api/notes', (req, res) => {

    // const {title, text} = req.body;
    // const identifier = uuidv4();
    // db.create({
    //     identifier,
    //     title,
    //     text
    // })
    appendNote(req)
    res.json({
        message: 'Received!'
    })
});


// router.delete('/api/notes/:id', () => {})


module.exports = router;