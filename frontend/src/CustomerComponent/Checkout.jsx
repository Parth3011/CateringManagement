import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const items = JSON.parse(decodeURIComponent(queryParams.get("items")));
  const totalPrice = parseFloat(queryParams.get("totalPrice"));
  const numberOfPeople = parseInt(queryParams.get("numberOfPeople"));
  const event = queryParams.get("event");
  const catererId = queryParams.get("caterer_id");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!time) errors.time = "Please select a time";
    if (!date) errors.date = "Please select a date";
    if (!address) errors.address = "Please enter your address";
    if (!city) errors.city = "Please select your city";
    if (!state) errors.state = "Please select your state";

    if (Object.keys(errors).length === 0) {
      const confirmation = window.confirm(
        "Are you sure you want to proceed with the booking?"
      );
      if (confirmation) {
        const foodNamesString = items.map((item) => item.foodname).join(", ");
        const menuIdsString = items.map((item) => item.id).join(",");

        const bookingData = {
          items: foodNamesString,
          menu_id: menuIdsString,
          totalPrice,
          numberOfPeople,
          event,
          catererId,
          time,
          date,
          address,
          city,
          state,
        };

        try {
          const response = await axios.post(
            "http://localhost:7000/api/events",
            bookingData
          );
          if (response.status === 200) {
            const eventId = response.data.eventId; // Get the event ID from the response
            alert("Now you can proceed with Order.");
            navigate(`/customer/order`, { state: { ...bookingData, eventId } });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    setErrors(errors);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f0f0",
      }}
    >
      <div
        className="square"
        style={{
          width: "80%",
          maxWidth: "600px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label>Date</label>
        <input
          type="date"
          className={errors.date ? "date error" : "date"}
          name="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <span className="error" style={{ color: "red", fontSize: "14px" }}>
          {errors.date}
        </span>
        <br />

        <label>Time</label>
        <input
          type="time"
          className={errors.time ? "time error" : "time"}
          name="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />
        <span className="error" style={{ color: "red", fontSize: "14px" }}>
          {errors.time}
        </span>
        <br />

        <label>Address</label>
        <textarea
          className={errors.address ? "address error" : "address"}
          rows="1"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        ></textarea>
        <span className="error" style={{ color: "red", fontSize: "14px" }}>
          {errors.address}
        </span>
        <br />

        <label>City</label>
        <select
          className={errors.city ? "city error" : "city"}
          name="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          <option value="">Select City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
        <span className="error" style={{ color: "red", fontSize: "14px" }}>
          {errors.city}
        </span>
        <br />

        <label>State</label>
        <select
          className={errors.state ? "state error" : "state"}
          name="state"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          <option value="">Select State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Karnataka">Karnataka</option>
        </select>
        <span className="error" style={{ color: "red", fontSize: "14px" }}>
          {errors.state}
        </span>
        <br />

        <input
          type="submit"
          className="book bg-success"
          value="Book"
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
            border: "none",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
