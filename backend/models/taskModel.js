//imports
const mongoose = require("mongoose");

//create a schema
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create a model amd connect to Schema
const taskModel = mongoose.model("Task", taskSchema);

//export model
module.exports = taskModel;
