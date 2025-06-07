import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const InputItems = ({ handleNewTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [complete, setComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setErrorMessage("Task cannot be empty.");
      return;
    }

    handleNewTask({
      id: uuid(),
      task,
      date,
      time,
      complete,
    });

    setTask("");
    setDate("");
    setTime("");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-primary-content rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Add New Task
      </h1>

      <form onSubmit={handleAddTask} className="space-y-6">
        {/* Task Input */}
        <div>
          <label htmlFor="task" className="label">
            <span className="label-text">Task Name</span>
          </label>
          <input
            id="task"
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. Buy groceries"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="label">
            <span className="label-text">Due Date</span>
          </label>
          <input
            id="date"
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="label">
            <span className="label-text-alt">Format: YYYY-MM-DD</span>
          </div>
        </div>

        {/* Time Picker */}
        <div>
          <label htmlFor="time" className="label">
            <span className="label-text">Due Time</span>
          </label>
          <input
            id="time"
            type="time"
            className="input input-bordered w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className="label">
            <span className="label-text-alt">Format: HH:MM (24-hour)</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputItems;
