const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello, World!")
})

app.get('/about', (req, res)=>{
    res.send('Welcome to the About page!')
})

app.use(express.json()); // Middleware to parse JSON bodies

let notes = []

app.get('/notes', (req, res) => {
    res.json(notes); // Send the notes array as a JSON response
})

app.post('/notes', (req, res) => {
    req.body; // Access the JSON body of the request
    // console.log(req.body);
    notes.push(req.body);
    res.json({ message: 'Note added successfully',
        notes: notes  
    });
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    // notes = notes.filter((note, index) => index != id);
    delete notes[id];
    res.json({ message: 'Note deleted successfully'});  
})

app.patch('/notes/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const { role } = req.body;

    notes[id].role = role;
    res.json({ message: 'Note updated successfully'});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// npm --> Node Package Manager

// first do -> npm init -y
// npm i express

// npx nodemon server.js  -> helps to restart the server automatically on changes
// npx nodemon server.js --exec "node --inspect" -> for debugging with Chrome   
// npx nodemon server.js --exec "node --inspect-brk" -> for debugging with Chrome and break at the start

