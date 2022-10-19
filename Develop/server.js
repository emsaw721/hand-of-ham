const fs = require('fs')
const express = require('express')
const app = express(); 
const {notes} = require('./db/db.json')

// 1) db.json used to store and retrieve notes using fs
// 2) HTML routes created:
    //a. GET/ notes should return notes.html
    //b. GET * should return index.html
// 3) API routes created:
    //a. GET /api/notes should read db.json and return all saved notes as JSON
    //b. POST /api/notes should receive a new note to save on the request body, add to db.json, and return note to client. 
        //i) need to find a way to give each note a unique id when saved --> look for npm package 
//4) BONUS: add delete route 
    //a. DELETE /api/notes/:id should receive query parameter containing id of note. 
        //i) In order to delete, need to read all noties from db.json, remove given id, then rewrite notes to db.json 

//1)

function createNewNote(body, notesArray) {
    //body meaning request body 
    //notesArray has same information as {notes} 
    console.log(body)
    const note = body; 
    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({notes: notesArray}, null, 2));

    return body; 
}

//3b) 
app.post('/api/notes', (req, res) => {
    //req.body is where incoming content will be 
    // set id based on what the next index of array will be 
    req.body.id = notes.length.toString();

    // add note to json file and notes array 
    const note = createNewNote(req.body, notes);

    res.json(req.body); 
})