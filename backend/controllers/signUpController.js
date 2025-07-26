//imports
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//controller
const signUp = async (req, res) => {
  //get user data from request body
  const { fullname, email, username, password } = req.body;

  try {
    //check if user already exist
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new userModel({
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
    });

    //save new user to database
    const savedUser = await newUser.save();

    //create a token
    const token = jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true, // blocks client-side JS from accessing the cookie
        secure: true,
        sameSite: "None",
        maxAge: 3600000,
      })
      .status(201)
      .json({
        message: "User created successfully",
        token: token,
        data: {
          id: savedUser._id,
          fullname: savedUser.fullname,
          username: savedUser.username,
          email: savedUser.email,
        },
      });
  } catch (error) {
    console.error("Error occurred during user sign-up:", error.message);

    // If it's a Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed. Please check the provided data.",
        details: error.errors,
      });
    }

    // Duplicate key error (e.g. email already exists, if using unique: true)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A user with this email or username already exists.",
        field: Object.keys(error.keyValue),
      });
    }

    // Fallback: unknown server error
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

//exports
module.exports = signUp;
