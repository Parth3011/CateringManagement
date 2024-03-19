import React, { useEffect, useState } from "react";
import axios from "axios";

import "../Css/signup.css";

export default function CatererProfile({ user }) {
  // const [inputdata, setinputData] = useState(user);
  // const [re , setre] = useState(false);
  const [inputdata, setinputData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : user;
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(inputdata));
  }, [inputdata]);

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputdata);
    // confirm("Confirm to update your profile");

      try {
        axios
          .put("http://localhost:7000/api/updateprofile", inputdata)
          .then((resp) => {
            alert("Data Updated Successfully")
          });
        
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="registration">
      <h1>Profile</h1>
      <div className="box">
        <label>Username</label>
        <input
          type="text"
          className="uname"
          name="name"
          value={inputdata.name}
          onChange={handledata}
        />
        <br />

        <label>Email</label>
        <input
          type="text"
          className="email"
          name="Email"
          value={inputdata.email}
          onChange={handledata}
          disabled
        />
        <br />

        <label>Company Name</label>
        <input
          type="text"
          className="company"
          name="company"
          value={inputdata.company}
          onChange={handledata}
        />
        <br />

        {/* <label>Password</label>
      <input type = "text" className='pwd' name="pwd" 
            value={pwd} onChange={(e)=>{setPwd(e.target.value)}} 
            disabled
      /><br/> */}

        {/* <label>Confirm Password</label>
      <input type = "password" className='confirm' name="confirm" 
            value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} 
      /><br/> */}

        <label>Phone No.</label>
        <input
          type="number"
          className="phone"
          name="phone"
          value={inputdata.phone}
          onChange={handledata}
        />
        <br />

        <label>Address</label>
        <textarea
          className="address"
          rows="1"
          name="address"
          value={inputdata.address}
          onChange={handledata}
        ></textarea>
        <br />

        <label>Pincode</label>
      <input type = "number" className='pin' name="pincode" 
                value={inputdata.pincode} onChange={handledata} 
      /><br/>

        <label>City</label>
        <input
          type="text"
          className="city"
          name="city"
          value={inputdata.city}
          onChange={handledata}
        />
        <br />

        <label>State</label>
        <input
          type="text"
          className="state"
          name="state"
          value={inputdata.state}
          onChange={handledata}
        />
        <br />

        <input
          type="submit"
          className="register bg-success"
          value="Update"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
