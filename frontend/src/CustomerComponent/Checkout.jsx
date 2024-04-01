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

  console.log(items);
  console.log(totalPrice);
  console.log(numberOfPeople);
  console.log(event);


  // const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  // const [pid, setPid] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  
  
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (time && date && address && city && state) { // Check if all fields are filled
      const confirmation = window.confirm("Are you sure you want to proceed with the booking?");
      if (confirmation) {
        const bookingData = {
          items,
          totalPrice,
          numberOfPeople,
          event,
          time,
          date,
          address,
          city,
          state,
        };

        try {
          const response = await axios.post('http://localhost:7000/api/events', bookingData);
          if (response.status === 200) {
            alert("Booking successful");
            navigate("/customer/payment");
          }
        }
        catch (error) {
          console.error('Error:', error);
          // Display an error message to the user
        }
    // } else {
    //   alert("Please fill in all details before proceeding.");
     }
  };
}


  return (
    <div className="registration">
      <div className="square">
        {/* <label>Full Name</label>
                <input type="text" className='name' name="name"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                /><br /> */}

        <label>Date</label>
        <input
          type="date"
          className="date"
          name="date"
          value={date}
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

        {/* <label>Product Id</label>
                <input type="number" className='pid' name="pid"
                    value={pid} onChange={(e) => { setPid(e.target.value) }}
                /><br /> */}

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
          onClick={handlesubmit}
        />
      </div>
    </div>
  );
}
