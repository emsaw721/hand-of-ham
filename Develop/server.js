const fs = require('fs')
const express = require('express')
const PORT= process.env.PORT || 3001; 
const app = express(); 
const {notes} = require('./db/db.json')
// use for deleting the note, app.delete 
// const uuid = require('./helpers/uuid'); 
// take from class work or npm install 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static(`public`))//before express, anything in public to root level 

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


// can use id to delete note 
// function findById(id, notesArray) {
//     const result = notesArray.filter(note => note.id === id)[0];
//     return result; 
// }




function createNewNote(body, notesArray) {
    //body meaning request body 
    //notesArray has same information as {notes} 
    console.log(body)
    const note = body; 
    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({notes: notesArray}, null, 2));

    return body; 
}

app.get('/', (req,res) => {
    console.log('Reached route'); 
    res.sendFile('/index.html')
})

app.get('/notes', (req,res) => {
    console.log('Reached route!')
    res.sendFile('/notes.html')
})

//3a)
app.get('/api/notes', (req,res) => {
    let results= notes;
    console.log(results)
    res.json(results)
})
//3b) 
app.post('/api/notes', (req, res) => {
    //req.body is where incoming content will be 
    // set id based on what the next index of array will be 
    req.body.id = notes.length.toString();

    // add note to json file and notes array 
    const note = createNewNote(req.body, notes);

    res.json(req.body); 
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
})