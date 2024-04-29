import React, { useState } from "react";
import axios from "axios";

export default function CatererProfile({ user, onUpdateProfile }) {
  const [inputdata, setinputData] = useState(user);

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value || " " });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios
        .put("http://localhost:7000/api/updatecatererprofile", inputdata)
        .then((resp) => {
          alert("Data Updated Successfully");
          onUpdateProfile(inputdata);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "150vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #c3d1e4, #e5e7eb)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "800px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "50px",
            textDecoration: "underline",
          }}
        >
          Profile
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <label style={{ marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="name"
            value={inputdata.name}
            onChange={handledata}
          />
          <br />

          <label style={{ marginBottom: "5px" }}>Email</label>
          <input
            type="text"
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="email"
            value={inputdata.email}
            onChange={handledata}
            disabled
          />
          <br />

          <label style={{ marginBottom: "5px" }}>Company Name</label>
          <input
            type="text"
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
            name="company"
            value={inputdata.company}
            onChange={handledata}
          />
          <br />

          <label style={{ marginBottom: "5px" }}>Phone No.</label>
          <input
            type="number"
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="phone"
            value={inputdata.phone}
            onChange={handledata}
          />
          <br />

          <label style={{ marginBottom: "5px" }}>Address</label>
          <textarea
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            rows="1"
            name="address"
            value={inputdata.address}
            onChange={handledata}
          ></textarea>
          <br />

          <label style={{ marginBottom: "5px" }}>Pincode</label>
          <input
            type="number"
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="pincode"
            value={inputdata.pincode}
            onChange={handledata}
          />
          <br />

          <label style={{ marginBottom: "5px" }}>City</label>
          <select
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="city"
            value={inputdata.city}
            onChange={handledata}
          >
            <option value="">{inputdata.city}</option>
            <option value="">Select City</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <br />

          <label style={{ marginBottom: "5px" }}>State</label>
          <select
            style={{
              marginBottom: "5px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            name="state"
            value={inputdata.state}
            onChange={handledata}
          >
            <option value="">{inputdata.state}</option>
            <option value="">Select State</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          <br />

          <input
            type="submit"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              width: "80%", // Adjust the width as needed
              maxWidth: "200px", // Limit width on larger screens
              display: "block", // Ensure it takes full width
              marginLeft: "auto", // Align to the right
              marginRight: "auto", // Align to the left
            }}
            className="register bg-success"
            value="Update"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
