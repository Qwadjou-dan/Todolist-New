//imports
const express = require("express");
const {
  addTask,
  retrieveAllTasks,
  retrieveTaskById,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const authorize = require("../middleware/authMiddleware");

//initialize
const taskRoute = express.Router();

//routes
taskRoute.post("/tasks", authorize, addTask);
taskRoute.get("/tasks/:id", authorize, retrieveTaskById);
taskRoute.get("/tasks", authorize, retrieveAllTasks);
taskRoute.delete("/tasks/:id", deleteTask);
taskRoute.put("/tasks/:id", updateTask);

//exports
module.exports = taskRoute;
