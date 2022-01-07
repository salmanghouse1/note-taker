// importing package express
const express = require('express');
// add app to express so we can chain it from now on
const app = express();
const path = require('path');
const noteData = require('./db/db.json');
const uid = require('./helpers/uuid.js');



app.use(express.static('public'));


// using json files

app.use(express.json({ limit: '1mb' }))

// sending index file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(noteData)
})

app.post('/api/notes', (req, res) => {
    dataRes = res.body;
    const { title, text } = res.body;
    res.send(title, text);

})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})



// start a server

app.listen(3001, () => {
    console.log("Server Started, listening on port 3001");
})