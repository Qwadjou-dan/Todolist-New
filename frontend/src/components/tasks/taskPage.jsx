//imports
import React, { useState } from "react";
import InputTask from "../tasks/inputTask";
import TaskList from "../tasks/taskList";
import Navbar from "../pages/navbar";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const username = "username"; // Placeholder for username

  const handleNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompletedTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, complete: true } : task))
    );
  };

  const handleEditTask = (id, newTask) => {
    setTasks(tasks.map((task) => (task.id === id ? newTask : task)));
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
