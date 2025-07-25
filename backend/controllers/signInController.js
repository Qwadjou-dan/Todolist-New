//imports
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//controller
const signIn = async (req, res) => {
  //get user data from request body
  const { username, email, password } = req.body;

  try {
    //ensure required credentials are provided
    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "Please provide username or email and password",
      });
    }

    //check if user exist
    const query = email ? { email } : { username };
    const existingUser = await userModel.findOne(query);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password, Please try again",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    // send token via cookie and response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      })
      .status(201)
      .json({
        message: "Login successful",
        data: {
          id: existingUser._id,
          fullname: existingUser.fullname,
          username: existingUser.username,
          email: existingUser.email,
        },
      });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred during sign-in.",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

//exports
module.exports = signIn;
