import React, { useEffect, useState } from "react";

import Login from "../Component/Login";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignupCaterer from "../CatererComponent/SignupCaterer";
import SignupCustomer from "../CustomerComponent/SignupCustomer";

import Footer from "../Component/Footer";
//import Nav from "../Component/Nav";


import Signup from "../Component/Signup";
import CatererMenu from "../CatererComponent/CatererMenu";
import CatererProfile from "../CatererComponent/CatererProfile";
import Profile from "../Component/Profile";
import CustomerProfile from '../CustomerComponent/CustomerProfile';
import Checkout from '../CustomerComponent/Checkout';
import CatererOutlet from "../CatererComponent/CatererOutlet";
import CustomerOutlet from "../CustomerComponent/CustomerOutlet";
import AdminOutlet from "../Component/adminOutlet";
import ForgetPassword from "../Component/ForgetPassword";
import Caterer from "../Component/Caterer";
import Customer from "../Component/Customer";
import FirstPage from "../Component/FirstPage";
import Menus from "../CatererComponent/menus";
import UpdateMenu from "../CatererComponent/UpdateMenu";
import AdminHome from "../Component/AdminHome";
import CatererHome from "../CatererComponent/CatererHome";
import CustomerHome from "../CustomerComponent/CustomerHome";
import Caterermenudetails from "../CustomerComponent/Caterermenudetails";
// import LogoutOutlet from "../Component/Logout";


export default function Home() {
  // const [user, setuser] = useState(null);
  // console.log(user);

  // useEffect(() => {
  //   // Check if user is not null before logging
  //   if (user !== null) {
  //     console.log("User state changed:", user);
  //   }
  // }, [user]);

  const [user, setuser] = useState(() => {
    // Retrieve user from localStorage
    const savedUser = localStorage.getItem("user");
   return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  

  const onlogin = (data) => {
    setuser(data);
    console.log("Hello"+data);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setuser(null);
  };

  const onUpdateProfile = (updatedUser) => {
    setuser(updatedUser);
  };
  

  // console.log("re-rendered");
  return (
    <div>
      <BrowserRouter>

        {/* <Nav user={user} /> */}
        <Routes>
          <Route path="/" element={<FirstPage/>} />
          <Route path="/login" element={<Login UserData={onlogin} />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/signup1" element={<SignupCaterer datauser={onlogin}/>} />
          <Route path="/signup2" element={<SignupCustomer datauser={onlogin}/>} />
          {/* <Route path="signupadmin" element={<Signup />} /> */}


          {/* admin */}
          <Route  path="/admin" element={<AdminOutlet />}>
            <Route path="home" element={<AdminHome user={user}/>} />
            <Route path="admincaterer" element={<Caterer />} />
            <Route path="admincustomer" element={<Customer/>} />
            <Route path="profile" element={<Profile user={user} onUpdateProfile={onUpdateProfile}/>} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />
            <Route path="*" element={<h1>404 Page</h1>} />
            <Route path="signupadmin" element={<Signup datauser={onlogin}/>} />
          </Route>
 


          {/* caterer */}

          <Route path="/caterer" element={<CatererOutlet />}>
            <Route path="home" element={<CatererHome user={user}/>} />
            <Route path="menu" element={<Menus user={user}/>} />
            <Route path="UpdateMenu/:id" element={<UpdateMenu />} />
            <Route path="catererMenu" element={<CatererMenu user={user}/>}/>
            <Route path="order" element={<p>Order</p>} />
            <Route path="profile" element={<CatererProfile user={user} onUpdateProfile={onUpdateProfile}/>} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />
            <Route path="*" element={<h1>404 Page</h1>} />
          </Route>

          {/* customer */}
          <Route path="/customer" element={<CustomerOutlet />}>
            <Route path="home" element={<CustomerHome user={user}/>} />  
            <Route path="cmenu/:caterer_id" element={<Caterermenudetails />} />
            <Route path="cart" element={<Checkout />} />
            <Route path="profile" element={<CustomerProfile user={user} onUpdateProfile={onUpdateProfile}/>} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />
            <Route path="*" element={<h1>404 Page</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>

       <Footer />
    </div>
  );
}


function Logout({ onLogout }) {
  // Call the logout function when the component mounts
  React.useEffect(() => {
    onLogout();
  }, [onLogout]);

  // Redirect to the login page after logout
  return <Navigate to="/login" replace />;
}