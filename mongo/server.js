const express = require('express');
const app = express();
const connectDB = require('./src/db/db')

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send("Hello from Mongo");
})

app.post('/notes', (req, res) => {
    const {title, content} = req.body;
    console.log(title, content);
    
})


//how to connect sever database to server.js file 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})