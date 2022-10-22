const fs = require('fs')
const notes = require('./db/db.json');
const notesArr = []
const express = require('express')
const PORT= process.env.PORT || 3001; 
const app = express(); 
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')
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


// function createNewNote() {
// fs.writeFile(`./db/db.json`,notesArr[i] , (err) =>
// err
// ? console.error(err)
// : console.log(
//     `A new note has been written to JSON file.`
// ))

// const response = {
//     status: 'success',
//     body: newNote 
// }
// console.log(response)
// return res.json(response)

// }

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
})