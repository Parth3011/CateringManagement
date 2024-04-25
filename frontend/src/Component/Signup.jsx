import React, { useState } from 'react';
import '../Css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup({ datauser }) {

  const data = { name: "", email: "", pwd: "", confirm: "", phone: "", address: "", pincode: "", city: "", state: "" };
  const [inputdata, setinputData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleData = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
    // Clear previous errors
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(inputdata);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      axios.post('http://localhost:7000/api/signupadmin', inputdata)
        .then((resp) => {
          console.log(resp.data.Status);
          if (resp.data.Status === "Success") {
            navigate("/admin");
            datauser(resp.data.user);
            console.log("resp", resp);
          }else if (resp.data.msg === "This user is already in use!") {
            alert("Email already exists. Please use a different email address.");
          }else {
            console.log("hi here");
            alert("Registration is invalid");
          }
        })
        .then((err) => console.log(err))
    } catch (e) {
      console.error('Error submitting form:', e);
      alert('An error occurred while submitting the form');
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = 'Username is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.pwd) {
      errors.pwd = 'Password is required';
    } else if (data.pwd.length < 5) {
      errors.pwd = 'Password should be at least 5 characters long';
    }
    if (!data.confirm) {
      errors.confirm = 'Confirm password is required';
    } else if (data.confirm !== data.pwd) {
      errors.confirm = 'Passwords do not match';
    }
    if (!data.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = 'Phone number should contain exactly 10 digits';
    }
    if (!data.address) {
      errors.address = 'Address is required';
    }
    if (!data.pincode) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(data.pincode)) {
      errors.pincode = 'Pincode should contain exactly 6 digits';
    }
    if (!data.city) {
      errors.city = 'City is required';
    }
    if (!data.state) {
      errors.state = 'State is required';
    }
    return errors;
  };
  

  return (
    <div className='registration'>
      <h1>Registration Admin</h1>
      <div className='box'>
        <label>Username</label>
        <input type="text" className='uname' name="name" value={inputdata.name} onChange={handleData} />
        <span className='error'>{errors.name}</span><br />

        <label>Email</label>
        <input type="email" className='email' name="email" value={inputdata.email} onChange={handleData} />
        <span className='error'>{errors.email}</span><br />

        <label>Password</label>
        <input type="password" className='pwd' name="pwd" value={inputdata.pwd} onChange={handleData} />
        <span className='error'>{errors.pwd}</span><br />

        <label>Confirm Password</label>
        <input type="password" className='confirm' name="confirm" value={inputdata.confirm} onChange={handleData} />
        <span className='error'>{errors.confirm}</span><br />

        <label>Phone No.</label>
        <input type="number" className='phone' name="phone" value={inputdata.phone} onChange={handleData} />
        <span className='error'>{errors.phone}</span><br />

        <label>Address</label>
        <textarea className='address' rows="1" name="address" value={inputdata.address} onChange={handleData}></textarea>
        <span className='error'>{errors.address}</span><br />

        <label>Pincode</label>
        <input type="number" className='pin' name="pincode" value={inputdata.pincode} onChange={handleData} />
        <span className='error'>{errors.pincode}</span><br />

        <label>City</label>
        <input type="text" className='city' name="city" value={inputdata.city} onChange={handleData} />
        <span className='error'>{errors.city}</span><br />

        <label>State</label>
        <input type="text" className='state' name="state" value={inputdata.state} onChange={handleData} />
        <span className='error'>{errors.state}</span><br />

        <input type="submit" className="register bg-success" value="Submit" onClick={handleSubmit} />

      </div>
    </div>
  )
}
