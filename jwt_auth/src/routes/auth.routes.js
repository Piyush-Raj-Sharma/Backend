const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.create({
        username,
        password
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username : username
    })

    if(!user) return res.status(401).json({message : "Invalid User!!!"})

    const isPasswordValid = password == user.password;
    
    if(!isPasswordValid) return res.status(401).json({message : "Invalid password!!!"});

    res.json({
        message: "User loggedIn successfully!"
    })
})

router.get('/user', async (req, res) => {
    const {token} = req.body;

    if(!token){
        res.json({
            message: "Unauthorized Access",
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id : decoded.id
        }).select("-password -__v") // .select("-password -__v") -> does not reads the key with - with it from the database 

        // .lean() ->search

        res.status(200).json({
            message: "User data fetched successfully",
            user
        })
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized - Invalid Token"
        })
    }
})

module.exports = router;