import React from 'react'
import Footer from '../Component/Footer';
// import SignupCustomer from '../CustomerComponent/SignupCustomer';
import NavCustomer from '../CustomerComponent/NavCustomer';
import CustomerProfile from '../CustomerComponent/CustomerProfile';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from '../CustomerComponent/Checkout';




export default function Customer() {
    return (
        <div>
            <BrowserRouter>
                <NavCustomer />
                <Routes>
                    {/* <Route path="/signup2" element={<SignupCustomer />} /> */}


                    <Route path="/" element={<p>Home Page</p>} />
                    <Route path="/menu" element={<p>Menu</p>} />
                    <Route path="/cart" element={<Checkout/>} />
                    
                    <Route path="/profile" element={<CustomerProfile />} />
                    <Route path="/logout" element={<p>Logout</p>} />

                    <Route path="*" element={<h1>404 Page</h1>} /> 
                    
                    {/* <Route path="/setting" element={<p>Setting</p>}/>

                    {/* <Route path='/signup' element={<SignupCaterer />} />
          <Route path='/login' element={<Login />} /> */}


                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
}
