import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/checkout.css";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve data from query parameters
  const items = JSON.parse(decodeURIComponent(queryParams.get("items")));
  const totalPrice = parseFloat(queryParams.get("totalPrice"));
  const numberOfPeople = parseInt(queryParams.get("numberOfPeople"));
  const event = queryParams.get("event");
  const catererId = queryParams.get("caterer_id"); // Retrieve caterer_id

  console.log(items);
  console.log(totalPrice);
  console.log(numberOfPeople);
  console.log(event);
  console.log(catererId); // Log caterer_id

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (time && date && address && city && state) {
      const confirmation = window.confirm(
        "Are you sure you want to proceed with the booking?"
      );
      if (confirmation) {
        const foodNamesString = items.map((item) => item.foodname).join(", ");
      const menuIdsString = items.map((item) => item.id).join(",");

      const bookingData = {
        items: foodNamesString,
        menu_id: menuIdsString, // Include menu ids
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
  };

  return (
    <div className="registration">
      <div className="square">
        <label>Date</label>
        <input
          type="date"
          className="date"
          name="date"
          value={date}
          min={(new Date()).toISOString().split('T')[0]}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <br />

        <label>Time</label>
        <input
          type="time"
          className="time"
          name="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <br />

        <label>Address</label>
        <textarea
          className="address"
          rows="1"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></textarea>
        <br />

        <label>City</label>
        <input
          type="text"
          className="city"
          name="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <br />

        <label>State</label>
        <textarea
          className="state"
          rows="1"
          name="state"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        ></textarea>
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
