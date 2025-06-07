//imports
import React from "react";
import { Outlet } from "react-router-dom";

//Layout component
const RootLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
