import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/checkout.css";
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
    if (!city) errors.city = "Please enter your city";
    if (!state) errors.state = "Please enter your state";

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
    <div className="registration">
      <div className="square">
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
        />
        <span className="error">{errors.date}</span>
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
        />
        <span className="error">{errors.time}</span>
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
        ></textarea>
        <span className="error">{errors.address}</span>
        <br />

        <label>City</label>
        <input
          type="text"
          className={errors.city ? "city error" : "city"}
          name="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <span className="error">{errors.city}</span>
        <br />

        <label>State</label>
        <textarea
          className={errors.state ? "state error" : "state"}
          rows="1"
          name="state"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        ></textarea>
        <span className="error">{errors.state}</span>
        <br />

        <input
          type="submit"
          className="book bg-success"
          value="Book"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
