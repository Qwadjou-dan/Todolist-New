//imports
const mongoose = require("mongoose");

//create a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create a model and connect to schema
const userModel = mongoose.model("User", userSchema)

//export model
modeule.exports = userModel

