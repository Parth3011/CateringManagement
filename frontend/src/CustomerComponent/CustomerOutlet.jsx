import React from 'react'
import NavCustomer from './NavCustomer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CustomerOutlet = () => {

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/customer") {
      navigate("/customer/home");
    }
  }, [location, navigate]);

  return (
    <>
      <NavCustomer/>
      <Outlet/>
    </>
  )
}

export default CustomerOutlet;
