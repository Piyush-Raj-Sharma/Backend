const express = require('express');
const indexRoutes = require('../routes/index.routes');

const app = express();

app.use((req, res, next) => {
    console.log("This is a middleware between app & routes");
    next() //without next the Middleware will not allow the request to move forward 
})

app.use('/', indexRoutes)


module.exports = app;