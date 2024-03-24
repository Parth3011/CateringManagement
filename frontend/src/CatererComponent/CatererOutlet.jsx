import React from "react";
import NavCaterer from "./NavCaterer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CatererOutlet = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/caterer") {
      navigate("/caterer/home");
    }
  }, [location, navigate]);


  return (
    <>
      <NavCaterer />
      <Outlet />
    </>
  );
};

export default CatererOutlet;
