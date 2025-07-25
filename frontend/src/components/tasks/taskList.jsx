import React from "react";
import { EditTask } from "../tasks/editTask";
import { MdDelete } from "react-icons/md";

const TaskList = ({
  tasks = [],
  handleDeleteTask,
  handleCompletedTask,
  handleEditTask,
}) => {
  return (
    <div className="space-y-6">
      {tasks.filter(Boolean).map((task) => {
        const isComplete = task.complete;
        const taskText = task.taskName;

        return (
          <div
            key={task.id || task._id}
            className="flex flex-col md:flex-row items-center justify-between gap-4 px-4"
          >
            <div
              className={`w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg border-2 ${
                isComplete ? "bg-green-100 border-green-300" : "bg-white"
              }`}
            >
              <p className="font-medium text-lg flex-grow truncate">
                {taskText}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                <span className="hidden md:inline">
                  {task.date ? task.date.slice(0, 10) : "No date"}
                </span>
                <span className="md:hidden">
                  {task.date ? task.date.slice(2, 10) : "No date"}
                </span>
                <span>{task.time || "No time"}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCompletedTask(task.id || task._id)}
                className={`btn border-none ${
                  isComplete ? "bg-green-500 hover:bg-green-600" : "btn-primary"
                }`}
              >
                <span className="hidden md:inline">
                  {isComplete ? "Completed" : "Complete"}
                </span>
                <input
                  type="checkbox"
                  checked={isComplete}
                  readOnly
                  className="md:hidden checkbox checkbox-sm"
                />
              </button>

              <EditTask task={task} handleEditTask={handleEditTask} />

              <button
                onClick={() => handleDeleteTask(task.id || task._id)}
                className="btn btn-error hover:bg-[#DC2626] border-none"
              >
                <span className="hidden md:inline">Delete</span>
                <MdDelete className="md:hidden text-lg" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
