const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username: username,
  });
  if (existingUser)
    return res.status(400).json({ message: "User already exists!!!" });

  //in real world app, never store password as plain text, always hash the password before storing it in the database
  //hashing -> converting plain text to some other form so that no one can read it

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, 
    {
        httpOnly: true,   // makes cookie inaccessible via JS (security)
        secure: false,    // set true in production with HTTPS
        sameSite: "strict"
    }
  ); //setting the token in the cookies
  //cookies are the pieces of data, that is send along with every HTTP request

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) return res.status(401).json({ message: "Invalid User!!!" });

  const isPasswordValid = password == user.password;

  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid password!!!" });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", //token will be expired in 1 hour
    }
  );

  res.cookie("token", token, {
    httpOnly: true, // makes cookie inaccessible via JS (security)
    secure: false, // set true in production with HTTPS
    sameSite: "strict",
  }); //setting the token in the cookies

  res.json({
    message: "User loggedIn successfully!",
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.cookies; //token will be accessed from cookie

  if (!token) {
    res.json({
      message: "Unauthorized Access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password -__v"); // .select("-password -__v") -> does not reads the key with - with it from the database

    // .lean() ->search

    res.status(200).json({
      message: "User data fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User logged out successfully",
  });
});

module.exports = router;
