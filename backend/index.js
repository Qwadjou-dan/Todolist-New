//imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Routes = require("./routes/userRoute");
const todoRoute = require("./routes/taskRoute");
const cors = require("cors");
const { cookie } = require("express-validator");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//initialize
const todolistApp = express();
const PORT = process.env.PORT || 1001;

//middleware
todolistApp.use(bodyParser.json());
todolistApp.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
todolistApp.use(cookieParser());

//routes
todolistApp.use("/api", Routes);
todolistApp.use("/api", todoRoute);

//start server
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    todolistApp.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB.");
    console.error("Check if your MONGO_DB string is correct in the .env file.");
    console.error(
      "Make sure your internet connection is active and MongoDB Atlas cluster is accessible."
    );
    console.error("Error details:", err.message);
  });
