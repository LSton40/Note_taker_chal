const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3333;

const routes = require('./routes/routes');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', routes); // Load routes


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'))
//         // .then(data => {
//         //     res.json(data)
//         // })
//         // .catch(err => console.log(err))
    
// })

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/notes.html'))
//         // .then(data => {
//         //     res.json(data)
//         // })
//         // .catch(err => console.log(err))
// })




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});