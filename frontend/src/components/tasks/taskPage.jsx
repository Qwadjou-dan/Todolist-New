//imports
import React, { useEffect, useState } from "react";
import InputTask from "../tasks/inputTask";
import TaskList from "../tasks/taskList";
import Navbar from "../pages/navbar";
import {
  createTask,
  deleteTask,
  retrieveTask,
  updateTask,
} from "../../services/api";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const username = "username"; // Placeholder for username

  const handleNewTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      console.log("Created task: ", createdTask);
      setTasks([...tasks, createdTask.task]);
    } catch (error) {
      console.error("Error adding new task:", error.message);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const retrievedTask = await retrieveTask();
        // console.log("Retrieved Tasks: ", retrievedTask.tasks);
        setTasks(retrievedTask.tasks || []);
      } catch (error) {
        console.log("Error retrieving tasks:", error.message);
      }
    };

    getTasks();
  }, [tasks]);

  const handleDeleteTask = async (id) => {
    try {
      const deletedTask = await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error.message);
    }
  };

  const handleCompletedTask = (id) => {
    setTasks(
      tasks.map((task) =>
        (task.id || task._id) === id ? { ...task, complete: true } : task
      )
    );
  };

  const handleEditTask = async (id, newTask) => {
    try {
      const updatedTask = await updateTask(id, newTask);
      const editedTask = tasks.map((task) => {
        if (task._id === id) {
          return { ...task, task: newTask.task };
        } else {
          return task;
        }
      });
      setTasks(editedTask);
      console.log(updatedTask);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar username={username} />
      <div className="flex flex-col sm:flex-row sm:pl-10 gap-20 min-h-screen">
        <div className="sm:w-[300px] p-2 w-full">
          <InputTask handleNewTask={handleNewTask} />
        </div>
        <div className="flex-1 bg-primary-content p-4">
          <h1 className="text-4xl font-bold mb-10 text-primary">Task List</h1>
          <TaskList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleCompletedTask={handleCompletedTask}
            handleEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
