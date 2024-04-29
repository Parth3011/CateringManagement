import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupCustomer({ datauser }) {
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
        const resp = await axios.post(
          "http://localhost:7000/api/signupcustomer",
          inputdata
        );
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
    let formIsValid = true;
    let newErrors = {};

    // Username validation
    if (!inputdata.name) {
      newErrors.name = "Please enter your username.";
      formIsValid = false;
    }

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

    // Phone validation
    if (!inputdata.phone) {
      newErrors.phone = "Please enter your phone number.";
      formIsValid = false;
    } else {
      let pattern = /^\d{10}$/;
      if (!pattern.test(inputdata.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
        formIsValid = false;
      }
    }

    // Address validation
    if (!inputdata.address) {
      newErrors.address = "Please enter your address.";
      formIsValid = false;
    }

    // Pincode validation
    if (!inputdata.pincode) {
      newErrors.pincode = "Please enter your pincode.";
      formIsValid = false;
    } else {
      let pattern = /^\d{6}$/;
      if (!pattern.test(inputdata.pincode)) {
        newErrors.pincode = "Please enter a valid pincode.";
        formIsValid = false;
      }
    }

    // City validation
    if (!inputdata.city) {
      newErrors.city = "Please enter your city.";
      formIsValid = false;
    }

    // State validation
    if (!inputdata.state) {
      newErrors.state = "Please enter your state.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };


  
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
    <div
      style={{
        height: "150vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, #c3d1e4, #e5e7eb)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          // width: "80%",
          // maxWidth: "400px", // Max width for responsiveness
          width: "800px"
        }}
      >
        <h1 style={{ marginBottom: "20px" ,fontSize:"50px"}}>
          Registration Customer
        </h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            name="name"
            value={inputdata.name}
            onChange={handledata}
            style={{  marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.name}
          </span>

          <label style={{ marginBottom: "5px" }}>Email</label>
          <input
            type="text"
            name="email"
            value={inputdata.email}
            onChange={handledata}
            onBlur={validate}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.email}
          </span>

          <label style={{ marginBottom: "5px" }}>Password</label>
          <input
            type="password"
            name="pwd"
            value={inputdata.pwd}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.pwd}
          </span>

          <label style={{ marginBottom: "5px" }}>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={inputdata.confirm}
            onChange={handledata}
            onBlur={validate}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.confirm}
          </span>

          <label style={{ marginBottom: "5px" }}>Phone No.</label>
          <input
            type="text"
            name="phone"
            value={inputdata.phone}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.phone}
          </span>

          <label style={{ marginBottom: "5px" }}>Address</label>
          <textarea
            rows="1"
            name="address"
            value={inputdata.address}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          ></textarea>
          <span className="error" style={{ color: "red" }}>
            {errors.address}
          </span>

          <label style={{ marginBottom: "5px" }}>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={inputdata.pincode}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.pincode}
          </span>

          <label style={{ marginBottom: "5px" }}>City</label>
          <input
            type="text"
            name="city"
            value={inputdata.city}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.city}
          </span>

          <label style={{ marginBottom: "5px" }}>State</label>
          <input
            type="text"
            name="state"
            value={inputdata.state}
            onChange={handledata}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <span className="error" style={{ color: "red" }}>
            {errors.state}
          </span>

          <input
            type="submit"
            value="Register Now"
            onClick={handleSubmit}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    </div>
  );
}
