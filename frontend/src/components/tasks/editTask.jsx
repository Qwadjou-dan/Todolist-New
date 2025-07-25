import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

export const EditTask = ({ task, handleEditTask }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [date, setDate] = useState(task.date);
  const [time, setTime] = useState(task.time);
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      // id: task.id,
      taskName,
      date,
      time,
    };

    console.log(updatedTask);

    handleEditTask(task._id, updatedTask);
    closeModal();
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        <span className="hidden md:inline">Edit</span>
        <FaEdit className="md:hidden text-lg" />
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex justify-end">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>
          </form>

          <h2 className="text-3xl font-semibold text-primary mb-6">
            Edit Task Info
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="form-control w-full">
              <span className="label-text font-medium mb-1">Task Name</span>
              <input
                type="text"
                placeholder="Update task name"
                className="input input-bordered w-full"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-medium mb-1">Date</span>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <span className="label-text-alt block mt-1  text-gray-400 text-sm">
                Format: DD-MM-YYYY
              </span>
            </label>

            <label className="form-control w-full">
              <span className="label-text font-medium mb-1">Time</span>
              <input
                type="time"
                className="input input-bordered w-full"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <span className="label-text-alt text-gray-400 text-sm">
                Format: HH:MM (24-hour)
              </span>
            </label>

            <button type="submit" className="btn bg-primary text-white w-full">
              Save Changes
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
