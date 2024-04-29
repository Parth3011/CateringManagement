import React, { useState } from 'react';
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

  const validate = () => {
    let formIsValid = true;
    let newErrors = {};

    // Email validation
    if (!inputdata.email) {
      newErrors.email = "Please enter your email address.";
      formIsValid = false;
    } else {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(inputdata.email)) {
        newErrors.email = "Please enter a valid email address.";
        formIsValid = false;
      }
    }

    // Password validation
    if (!inputdata.pwd) {
      newErrors.pwd = "Please enter your password.";
      formIsValid = false;
    } else if (inputdata.pwd.length < 5) {
      newErrors.pwd = "Password must be at least 5 characters long.";
      formIsValid = false;
    }

    // Confirm password validation
    if (!inputdata.confirm) {
      newErrors.confirm = "Please confirm your password.";
      formIsValid = false;
    } else if (inputdata.pwd !== inputdata.confirm) {
      newErrors.confirm = "Passwords do not match.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
    <div style={{ 
      height: '150vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #c3d1e4, #e5e7eb)',
    }}>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        width: '800px', // Increased width
      }}>
        <h1 style={{ marginBottom: '20px' , fontSize:"50px" }}>Registration Caterer</h1>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px' }}>Username</label>
          <input type="text" name="name" value={inputdata.name} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.name}</span>

          <label style={{ marginBottom: '5px' }}>Email</label>
          <input type="text" name="email" value={inputdata.email} onChange={handledata} onBlur={validate} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.email}</span>

          <label style={{ marginBottom: '5px' }}>Company Name</label>
          <input type="text" name="company" value={inputdata.company} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.company}</span>

          <label style={{ marginBottom: '5px' }}>Password</label>
          <input type="password" name="pwd" value={inputdata.pwd} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.pwd}</span>

          <label style={{ marginBottom: '5px' }}>Confirm Password</label>
          <input type="password" name="confirm" value={inputdata.confirm} onChange={handledata} onBlur={validate} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.confirm}</span>

          <label style={{ marginBottom: '5px' }}>Phone No.</label>
          <input type="number" name="phone" value={inputdata.phone} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <label style={{ marginBottom: '5px' }}>Address</label>
          <textarea rows="1" name="address" value={inputdata.address} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}></textarea>

          <label style={{ marginBottom: '5px' }}>Pincode</label>
          <input type="number" name="pincode" value={inputdata.pincode} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <label style={{ marginBottom: '5px' }}>City</label>
          <input type="text" name="city" value={inputdata.city} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <label style={{ marginBottom: '5px' }}>State</label>
          <input type="text" name="state" value={inputdata.state} onChange={handledata} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <input type="submit" value="Register Now" onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
        </form>
      </div>
    </div>
  );
}
