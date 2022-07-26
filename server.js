const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3333;

const routes = require('./routes/routes');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', routes); // Load routes


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});