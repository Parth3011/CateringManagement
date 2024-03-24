// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const AdminOutlet = () => {
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     navigate('/admin/home');
//   },[]);

//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };

// export default AdminOutlet;


import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const AdminOutlet = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/home");
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminOutlet;






