import React, { useState } from "react";
import "../Css/signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignupCustomer({datauser}) {
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

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const resp = await axios.post("http://localhost:7000/api/signupcustomer", inputdata);
        alert("Registration Successful");
        if (resp.data.Status === "Success") {
          navigate("/customer");
          datauser(resp.data.user);
        } else if (resp.data.msg === "This user is already in use!") {
            alert("Email already exists. Please use a different email address.");
        } else {
          alert("Registration is invalid");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form");
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
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    if (!inputdata.phone) {
      formIsValid = false;
      errors.phone = "Please enter your phone number.";
    } else {
      let pattern = /^\d{10}$/;
      if (!pattern.test(inputdata.phone)) {
        formIsValid = false;
        errors.phone = "Please enter a valid phone number.";
      }
    }

    if (!inputdata.address) {
      formIsValid = false;
      errors.address = "Please enter your address.";
    }

    if (!inputdata.pincode) {
      formIsValid = false;
      errors.pincode = "Please enter your pincode.";
    } else {
      let pattern = /^\d{6}$/;
      if (!pattern.test(inputdata.pincode)) {
        formIsValid = false;
        errors.pincode = "Please enter a valid pincode.";
      }
    }

    if (!inputdata.city) {
      formIsValid = false;
      errors.city = "Please enter your city.";
    }

    if (!inputdata.state) {
      formIsValid = false;
      errors.state = "Please enter your state.";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="registration">
      <h1>Registration Customer</h1>
      <div className="box">
        <label>Username</label>
        <input
          type="text"
          className="uname"
          name="name"
          value={inputdata.name}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.name}</span>
        <br />

        <label>Email</label>
        <input
          type="text"
          className="email"
          name="email"
          value={inputdata.email}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.email}</span>
        <br />

        <label>Password</label>
        <input
          type="password"
          className="pwd"
          name="pwd"
          value={inputdata.pwd}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.pwd}</span>
        <br />

        <label>Confirm Password</label>
        <input
          type="password"
          className="confirm"
          name="confirm"
          value={inputdata.confirm}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.confirm}</span>
        <br />

        <label>Phone No.</label>
        <input
          type="text"
          className="phone"
          name="phone"
          value={inputdata.phone}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.phone}</span>
        <br />

        <label>Address</label>
        <textarea
          className="address"
          rows="1"
          name="address"
          value={inputdata.address}
          onChange={handledata}
        ></textarea>
        <span className="error" style={{ color: 'red' }}>{errors.address}</span>
        <br />

        <label>Pincode</label>
        <input
          type="text"
          className="pin"
          name="pincode"
          value={inputdata.pincode}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.pincode}</span>
        <br />

        <label>City</label>
        <input
          type="text"
          className="city"
          name="city"
          value={inputdata.city}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.city}</span>
        <br />

        <label>State</label>
        <input
          type="text"
          className="state"
          name="state"
          value={inputdata.state}
          onChange={handledata}
        />
        <span className="error" style={{ color: 'red' }}>{errors.state}</span>
        <br />

        <input
          type="submit"
          className="register bg-success"
          value="Submit"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
