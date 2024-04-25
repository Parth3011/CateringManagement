import React, { useState } from 'react';
import '../Css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupCaterer({ datauser }) {

  const data = { name: "", email: "", company: "", pwd: "", confirm: "", phone: "", address: "", pincode: "", city: "", state: "" };
  const [inputdata, setinputData] = useState(data);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const resp = await axios.post('http://localhost:7000/api/signupcaterer', inputdata);
        console.log(resp.data.msg);
        console.log(resp.data.Status);
        if (resp.data.Status === "Success") {
          navigate("/caterer");
          datauser(resp.data.user);
        } else if (resp.data.msg === "This user is already in use!") {
          alert("Email already exists. Please use a different email address.");
        } else {
          console.log("hi here");
          alert("Registration is invalid");
        }
      } catch (e) {
        console.error('Error submitting form:', e);
        alert('An error occurred while submitting the form');
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!inputdata.name) {
      formIsValid = false;
      errors.name = "Please enter your username.";
    }

    if (!inputdata.email) {
      formIsValid = false;
      errors.email = "Please enter your email address.";
    } else {
      let pattern = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!pattern.test(inputdata.email)) {
        formIsValid = false;
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!inputdata.company) {
      formIsValid = false;
      errors.company = "Please enter your company name.";
    }

    if (!inputdata.pwd) {
      formIsValid = false;
      errors.pwd = "Please enter your password.";
    } else if (inputdata.pwd.length < 5) {
      formIsValid = false;
      errors.pwd = "Password must be at least 5 characters long.";
    }

    if (!inputdata.confirm) {
      formIsValid = false;
      errors.confirm = "Please confirm your password.";
    } else if (inputdata.pwd !== inputdata.confirm) {
      formIsValid = false;
      errors.confirm = "Passwords do not match.";
    }

    setErrors(errors);
    return formIsValid;
  }

  return (
    <div className='registration'>
      <h1>Registration Caterer</h1>
      <div className='box'>
        <label>Username</label>
        <input type="text" className='uname' name="name" value={inputdata.name} onChange={handledata} />
        <span className="error" style={{ color: 'red' }}>{errors.name}</span><br />

        <label>Email</label>
        <input type="text" className='email' name="email" value={inputdata.email} onChange={handledata} />
        <span className="error" style={{ color: 'red' }}>{errors.email}</span><br />

        <label>Company Name</label>
        <input type="text" className='company' name="company" value={inputdata.company} onChange={handledata} />
        <span className="error" style={{ color: 'red' }}>{errors.company}</span><br />

        <label>Password</label>
        <input type="password" className='pwd' name="pwd" value={inputdata.pwd} onChange={handledata} />
        <span className="error" style={{ color: 'red' }}>{errors.pwd}</span><br />

        <label>Confirm Password</label>
        <input type="password" className='confirm' name="confirm" value={inputdata.confirm} onChange={handledata} />
        <span className="error" style={{ color: 'red' }}>{errors.confirm}</span><br />

        <label>Phone No.</label>
        <input type="number" className='phone' name="phone" value={inputdata.phone} onChange={handledata} /><br />

        <label>Address</label>
        <textarea className='address' rows="1" name="address" value={inputdata.address} onChange={handledata}></textarea><br />

        <label>Pincode</label>
        <input type="number" className='pin' name="pincode" value={inputdata.pincode} onChange={handledata} /><br />

        <label>City</label>
        <input type="text" className='city' name="city" value={inputdata.city} onChange={handledata} /><br />

        <label>State</label>
        <input type="text" className='state' name="state" value={inputdata.state} onChange={handledata} /><br />

        <input type="submit" className="register bg-success" value="Register Now" onClick={handleSubmit} />
      </div>
    </div>
  );
}
