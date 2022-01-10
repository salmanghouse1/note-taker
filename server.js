// importing package express
const express = require('express');
// add app to express so we can chain it from now on
const app = express();
const path = require('path');
const noteData = require('./db/db.json');
const uid = require('./helpers/uuid.js');
const fs = require('fs');


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
    dataRes = req.body;
    const { title, text } = req.body;
    noteData.push(dataRes);
    console.log(noteData)
    fs.writeFile('./db/db.json', JSON.stringify(noteData),
        (err) => {
            if (err) {

            } else {
                res.status(200).send("Data saved!");
            }
        });


})

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params

    console.log(id)
    console.log(noteData)
    noteData.splice(noteData.findIndex(data => data.id === id), 1)
    console.log(noteData)
    fs.writeFile('./db/db.json', JSON.stringify(noteData),
        (err) => {
            if (err) {

            } else {
                res.status(200).send(noteData);
            }
        });


})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.delete('/api/notes')

// start a server

app.listen(process.env.PORT || 3001, () => {
    console.log("Server Started, listening on port 3001");
})