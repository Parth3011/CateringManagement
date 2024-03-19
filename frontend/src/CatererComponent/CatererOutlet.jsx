import React from "react";
import NavCaterer from "./NavCaterer";
import { Outlet } from "react-router-dom";

const CatererOutlet = () => {
  return (
    <>
      <NavCaterer />
      <Outlet />
    </>
  );
};

export default CatererOutlet;
