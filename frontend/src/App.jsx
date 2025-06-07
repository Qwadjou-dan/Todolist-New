import React, { useState } from "react";
import SignUp from "./components/registration/signUp";
import SignIn from "./components/registration/signIn";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/pages/layout";
import TaskPage from "./components/tasks/taskPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="tasks" element={<TaskPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
