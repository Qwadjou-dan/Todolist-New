//imports
const express = require("express");
const signUp = require("../controllers/signUpController");

//initialize
const router = express.Router();

//routes
router.post("/signup", signUp);

//exports
module.exports = router;
