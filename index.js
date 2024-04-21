//console.log("Hello world");
//import http from 'http'
//or
//const http = require('http')
const express = require("express");
const app = express()
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
/*
const app http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
    //response.end("Hello World")
})
*/
  app.use(express.json())

  const generateId = () => {
      const maxId = notes.length > 0
      ? Math.max(...notes.map(e => e.id))
      : 0
      return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) {
      return response.status(400).json({
        error: "content missing"
      })
    }
    const note = {
      content: body.content,
      important: Boolean(body.important)  || false,
      id: generateId(),

    }
    notes = notes.concat(note)
    response.json(note)
  })

    app.get("/", (request, response) => {
      response.send("<div><h1>Hello World!<h1/><p>It's easy to undertand this code, for example the slash in the get it works for get this part of code, and if you want the notes use; api/notes<p/><div/>")
      //response.send(`map of notes: ${notes.toString()}`)
    })
    app.get("/api/notes", (request, response) => {
        response.json(notes)
    })
    app.get("/api/notes/:id", (request, response) => {
      //const id = request.params.id
      const id = Number(request.params.id)
      console.log(id)
      //const note = notes.find(note => {
      //  console.log(note.id, typeof note.id, id, typeof id, note.id === id);
      //  return note.id === id
      //})
      const note = notes.find(note => note.id === id)
      console.log(note)
      if(note){
        response.json(note)
      }else{
        response.status(404).end()
      }
    })
    app.delete("/api/notes/:id", (request, response) => {
      const id = Number(request.params.id)
      notes = notes.filter(e => e.id !== id)

      response.status(204).end()
    })
    
const PORT = process.env.PORT ||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, localhost:${PORT}`)
})