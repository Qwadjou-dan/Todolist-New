//imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

//initialize
const todolistApp = express();
const PORT = process.env.PORT || 1001;

//middleware
todolistApp.use(bodyParser.json());

//routes

//start server
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    todolistApp.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB.");
    console.error(
      "👉 Check if your MONGO_DB string is correct in the .env file."
    );
    console.error(
      "👉 Make sure your internet connection is active and MongoDB Atlas cluster is accessible."
    );
    console.error("Error details:", err.message);
  });
