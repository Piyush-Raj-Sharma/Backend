const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log("This middleware is between routes & API");
    next(); //without next the Middleware will not allow the request to move forward 
})

router.get('/   ', (req, res) => {
    res.json({
        message: "Welcome to Middlewares",
    })
})

module.exports = router;