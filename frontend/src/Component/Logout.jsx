import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";



const LogoutOutlet = () => {
  return (
    <>
      <Login />
      <Outlet />
    </>
  );
};

export default LogoutOutlet;
