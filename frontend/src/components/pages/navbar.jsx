import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1D232A] text-white shadow-md">
      <div className="flex items-center text-4xl gap-2">
        <FcTodoList />
        <h1 className="text-xl font-bold">Todo List</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Hello, {username}</span>
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-error text-black hover:bg-[#DC2626]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
