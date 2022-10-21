const fs = require('fs')
const express = require('express')
const path = require('path');
const PORT= process.env.PORT || 3001; 
const app = express(); 
const {notes} = require('./db/db.json');
// use for deleting the note, app.delete 
 const uuid = require('./helpers/uuid'); 
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



//2b) kind of, need to have *
app.get('/', (req,res) => {
    console.log('Reached route'); 
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
//2a) 
app.get('/notes', (req,res) => {
    console.log('Reached route!')
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//3a)
app.get('/api/notes', (req,res) => {
   res.json(`${req.method} request received to get notes`)
   console.info(`${req.method} request received to get notes`)
})

//3b) 
app.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a new note.`)
//req.body is where incoming content will be 
    const { title, text } = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            note_id: uuid()
        };
        
        const noteString = JSON.stringify(newNote)
       
        fs.writeFile(`./db/db.json`, noteString, (err) =>
        err
        ? console.error(err)
        : console.log(
            `A new note has been written to JSON file.`
        ))
        const response = {
            status: 'success',
            body: newNote 
        }

        console.log(response)
        res.json(response)
    }else{
        res.json('Error in creating new note.'); 
    }
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
})