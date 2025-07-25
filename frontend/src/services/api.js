//imports
import axios from "axios";
import Cookie from "js-cookie";

//set the base URL for axios
const api = axios.create({
  baseURL: "https://todolist-backend-57ld.onrender.com",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const signUpApi = async ({ fullname, username, email, password }) => {
  try {
    const response = await api.post("/signup", {
      fullname,
      username,
      email,
      password,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error); // 🔍 Log full error
    console.error("Error Response:", error.response); // 🔍 Log server response
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

export const signInApi = async ({ username, password }) => {
  try {
    const response = await api.post("/signin", {
      username,
      password,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("Sign In Error:", error);
    console.error("Error Response:", error.response);
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "Sign in failed");
  }
};

export const createTask = async ({
  taskName,
  date,
  time,
  complete = false,
}) => {
  try {
    const response = await api.post("/tasks", {
      taskName,
      date,
      time,
      complete,
    });
    return response.data;
  } catch (error) {
    console.error("Creating Error:", error);
    console.error("Error Response:", error.response);
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "creating task failed");
  }
};

export const retrieveTask = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Retrieving Error:", error);
    console.error("Error Response:", error.response);
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "retrieving task failed");
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Updating Error:", error);
    console.error("Error Response:", error.response);
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "updating task failed");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Deleting Error:", error);
    console.error("Error Response:", error.response);
    console.error("Error Data:", error.response?.data);
    throw new Error(error.response?.data?.message || "deleting task failed");
  }
};
