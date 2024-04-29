import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupAdmin({ datauser }) {
  const data = {
    name: "",
    email: "",
    pwd: "",
    confirm: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  };
  const [inputdata, setinputData] = useState(data);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleData = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    try {
      axios.post('http://localhost:7000/api/signupadmin', inputdata)
        .then((resp) => {
          console.log(resp.data.Status);
          if (resp.data.Status === "Success") {
            navigate("/admin");
            datauser(resp.data.user);
            console.log("resp", resp);
          } else if (resp.data.msg === "This user is already in use!") {
            alert("Email already exists. Please use a different email address.");
          } else {
            console.log("hi here");
            alert("Registration is invalid");
          }
        })
        .then((err) => console.log(err))
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
        // width: '80%',
        // maxWidth: '400px', // Max width for responsiveness
        width:"800px"
    }}>
        <h1 style={{ marginBottom: '20px' ,fontSize:"50px"}}>Registration Admin</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px' }}>Username</label>
          <input type="text" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="name" value={inputdata.name} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.name}</span>

          <label style={{ marginBottom: '5px' }}>Email</label>
          <input type="email" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="email" value={inputdata.email} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.email}</span>

          <label style={{ marginBottom: '5px' }}>Password</label>
          <input type="password" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="pwd" value={inputdata.pwd} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.pwd}</span>

          <label style={{ marginBottom: '5px' }}>Confirm Password</label>
          <input type="password" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="confirm" value={inputdata.confirm} onChange={handleData} onBlur={validate}/>
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.confirm}</span>

          <label style={{ marginBottom: '5px' }}>Phone No.</label>
          <input type="number" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="phone" value={inputdata.phone} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.phone}</span>

          <label style={{ marginBottom: '5px' }}>Address</label>
          <textarea style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} rows="1" name="address" value={inputdata.address} onChange={handleData}></textarea>
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.address}</span>

          <label style={{ marginBottom: '5px' }}>Pincode</label>
          <input type="number" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="pincode" value={inputdata.pincode} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.pincode}</span>

          <label style={{ marginBottom: '5px' }}>City</label>
          <input type="text" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="city" value={inputdata.city} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.city}</span>

          <label style={{ marginBottom: '5px' }}>State</label>
          <input type="text" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} name="state" value={inputdata.state} onChange={handleData} />
          <span style={{ color: 'red', marginBottom: '10px' }}>{errors.state}</span>

          <input type="submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer', border: 'none' }} value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
