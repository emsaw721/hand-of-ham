// make sure that db.json is array: looks like this [{}]
//wasn't working before because basically writing a new file for every note object that we created 
// double check other id to make sure doesn't need to be note_id

const fs = require('fs'); 
const path = require('path');
// alternative way to do this is to call notes in each query, but here, we just call it once 
let notes = require('./db/db.json');
const express = require('express')
const PORT= process.env.PORT || 3001; 
const app = express(); 
const { v4: uuidv4 } = require('uuid'); 
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
        //i) In order to delete, need to read all notes from db.json, remove given id, then rewrite notes to db.json 

//2b) kind of, need to have *, just doesn't work with a * 
app.get('/', (req,res) => {
    console.log('Reached route'); 
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//2a) 
app.get('/notes', (req,res) => {
    console.log('Reached route!')
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//needs to be last or else will override other routes 
// app.get('*', (req,res) => {
//     console.log('Reached route');
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })

//3a)
app.get('/api/notes', (req,res) => {
    // res.json will stringify it 
    res.json(notes)
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
                note_id: uuidv4()
            };
            
            notes.push(newNote)
                fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) => {
                if(err) throw err
                   console.log(`A new note has been written to JSON file.`)
                 })

                const response = {
                status: 'success',
                body: newNote 
                }
        
            // return note to client 
            res.json(notes)
        }
})

// 4)
app.delete('/api/notes/:note_id', (req,res) => {
  

     notes = notes.filter(({ note_id }) => note_id !== req.params.note_id);
    

     fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) => {
        if(err){
            res.send(err)
        }
     })
     res.json(notes) 
    
}); 
//     if(req.body && req.params.note_id) {
//         const noteID = req.params.note_id;
//        
//             const currentNote = req.params.note_id;

//             if(currentNote.note_id === noteID){
//                 let newNotes = notesArr.splice(currentNote,1);
//                 let newString = JSON.stringify(newNotes)
//                 fs.writeFile(`./db/db.json`, newString, (err) => {
//                  if(err) throw err; 
//                 console.log(`A new note has been written to JSON file.`)
//                  )}
//             }
//         
//     } 
// })


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
})