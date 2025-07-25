//imports
const taskModel = require("../models/taskModel");

//controller
const addTask = async (req, res) => {
  //get user data from request body
  const { taskName, date, time, complete } = req.body;
  console.log("Request body:", req.body);
  try {
    //create new task
    const newTask = new taskModel({ taskName, date, time, complete });
    //save new task to database
    await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

const retrieveAllTasks = async (req, res) => {
  try {
    //retrieve all data
    const tasks = await taskModel.find();
    return res
      .status(200)
      .json({ message: "Task list retrieved successfully", tasks });
  } catch (error) {
    console.error("Retrieve error:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving tasks",
      error: error.message,
    });
  }
};

const retrieveTaskById = async (req, res) => {
  let { id } = req.params;
  try {
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: `Task with id ${id} not found` });
    }
    return res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.error("Retrieve error:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving tasks",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `Task with ${id} deleted`, deletedTask });
  } catch (error) {
    return res.status(400).json({
      message: "id not found",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, date, time, complete } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { taskName, date, time, complete },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: `Task with id:${id} not found` });
    }
    return res
      .status(200)
      .json({ message: `Task with id:${id} updated`, task: updatedTask });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
//exports
module.exports = {
  addTask,
  retrieveAllTasks,
  retrieveTaskById,
  deleteTask,
  updateTask,
};
