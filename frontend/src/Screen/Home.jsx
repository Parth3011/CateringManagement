import React, { useState } from "react";

import Login from "../Component/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";
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

export default function Home() {
  const [user, setuser] = useState(null);
  
  const onlogin = (data) => {
    setuser(data);
    console.log(user);
  };

  console.log("re-rendered");
  return (
    <div>
      <BrowserRouter>

        {/* <Nav user={user} /> */}
        <Routes>
          <Route path="/login" element={<Login UserData={onlogin} />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/signup1" element={<SignupCaterer />} />
          <Route path="/signup2" element={<SignupCustomer />} />
          {/* <Route path="signupadmin" element={<Signup />} /> */}

          {/* admin */}
          <Route exact path="/admin" element={<AdminOutlet />}>
            <Route path="admincaterer" element={<Caterer />} />
            <Route path="admincustomer" element={<p>Customer</p>} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<p>Logout</p>} />
            <Route path="*" element={<h1>404 Page</h1>} />
            <Route path="signupadmin" element={<Signup />} />
          </Route>
 


          {/* caterer */}

          <Route exact path="/caterer" element={<CatererOutlet />}>
            <Route exact path="menu" element={<CatererMenu />} />
            <Route path="order" element={<p>Order</p>} />
            <Route path="profile" element={<CatererProfile user={user}/>} />
            <Route path="logout" element={<p>Logout</p>} />
            <Route path="*" element={<h1>404 Page</h1>} />
          </Route>

          <Route  exact path="/customer" element={<CustomerOutlet />}>
            <Route path="menu" element={<p>Menu</p>} />
            <Route path="cart" element={<Checkout />} />
            <Route path="profile" element={<CustomerProfile user={user} />} />
            <Route path="logout" element={<p>Logout</p>} />

            <Route path="*" element={<h1>404 Page</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>

       <Footer />
    </div>
  );
}
