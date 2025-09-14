const express = require('express');
const connectDB = require('./src/db/db.js')
const noteModel = require('./src/models/note.model.js')

const app = express();


app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send("Hello from Mongo");
})

app.post('/notes', async (req, res) => {
    const {title, content} = req.body;
    console.log(title, content);
    await noteModel.create({title, content})

    res.json({message: "Note created successfully"})
})


app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();

    res.json({
        message: 'Notes fetched successfully',
        notes
    })
})

//how to connect sever database to server.js file 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})