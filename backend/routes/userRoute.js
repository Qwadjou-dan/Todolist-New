//imports
const express = require("express");
const signUp = require("../controllers/signUpController");
const signIn = require("../controllers/signInController");


//initialize
const router = express.Router();

//routes
router.post("/signup", signUp);
router.post("/signin", signIn);

//exports
module.exports = router;
