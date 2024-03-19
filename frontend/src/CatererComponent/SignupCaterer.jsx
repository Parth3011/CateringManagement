import React, { useState } from 'react';
import '../Css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupCaterer() {

  const data = { uname: "", email: "", company: "", pwd: "", confirm: "", phone: "", address: "", pin: "", city: "", state: "" };
  const [inputdata, setinputData] = useState(data);

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
  }


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // if(uname===""||ownerid===""||fullname===""||company===""||pwd===""||confirm===""||phone===""||address===""||pin===""||city===""||state===""){
    //   alert("plz fill all the details");
    // }
    // else{
    // navigate("/");
    // }

    e.preventDefault();
    try {
       axios.post('http://localhost:7000/api/signupcaterer', inputdata)
        // .then((resp) => navigate('/'))
        .then((resp) => {
          console.log(resp.data.Status);
          if (resp.data.Status === "Success") {
            navigate("/caterer");
            console.log("resp",resp);
          }
          else{
            console.log("hi here");
            alert("registration is invalid");
          }
        })
        .then((err) => console.log(err))
    } catch (e) {
      console.error('Error submitting form:', e);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className='registration'>
      <h1>Registration Caterer</h1>
      <div className='box'>
        <label>Username</label>
        <input type="text" className='uname' name="uname" value={inputdata.uname} onChange={handledata} /><br />

        {/* <label>Owner ID No.</label>
      <input type = "number" className='ownerid' name="ownerid" value={inputdata.ownerid} onChange={handledata} /><br/> */}

        <label>Email</label>
        <input type="text" className='email' name="email" value={inputdata.email} onChange={handledata} /><br />

        <label>Company Name</label>
        <input type="text" className='company' name="company" value={inputdata.company} onChange={handledata} /><br />

        <label>Password</label>
        <input type="password" className='pwd' name="pwd" value={inputdata.pwd} onChange={handledata} /><br />

        <label>Confirm Password</label>
        <input type="password" className='confirm' name="confirm" value={inputdata.confirm} onChange={handledata} /><br />

        <label>Phone No.</label>
        <input type="number" className='phone' name="phone" value={inputdata.phone} onChange={handledata} /><br />

        <label>Address</label>
        <textarea className='address' rows="1" name="address" value={inputdata.address} onChange={handledata}></textarea><br />

        <label>Pincode</label>
        <input type="number" className='pin' name="pin" value={inputdata.pin} onChange={handledata} /><br />

        <label>City</label>
        <input type="text" className='city' name="city" value={inputdata.city} onChange={handledata} /><br />

        <label>State</label>
        <input type="text" className='state' name="state" value={inputdata.state} onChange={handledata} /><br />

        <input type="submit" className="register bg-success" value="register Now" onClick={handleSubmit} />

      </div>
    </div>
  )
}



// const[uname,setUname] = useState("");
// const[ownerid,setOwnerid] = useState("");
// const[fullname,setFullName] = useState("");
// const[company,setCompany] = useState("");
// const[pwd,setPwd] = useState("");
// const[confirm,setConfirm] = useState("");
// const[phone,setPhone] = useState("");
// const[address,setAddress] = useState("");
// const[pin,setPin] = useState("");
// const[city,setCity] = useState("");
// const[state,setState] = useState("");