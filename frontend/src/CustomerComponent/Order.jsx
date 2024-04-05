import React, { useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from "axios";

const Order = ({ user , onOrderPlaced }) => {
  const location = useLocation();
  const bookingData = location.state;

  // console.log(user);
  // console.log(bookingData);
  // Access customer details from user prop
  const { name, email, phone, address: userAddress, city: userCity, state: userState } = user;
  const [orderStatus, setOrderStatus] = useState("pending");
  // const [setOrderId] = useState(null);

  const navigate = useNavigate();

  //const handleOrder = async () => {
  const handleOrder = async () => {
    try {

      // Send the order details to the backend
      const response = await axios.post("http://localhost:7000/api/order", {
        user,
        bookingData
      });
      // console.log("Hi bro");
      // Handle successful response from the backend

      console.log("hiii");
      if (response.status === 200) {
        alert("Order placed successfully! Now you can proceed with the payment process.");
        const orderId = response.data.order_id; // Extract order ID from the response

        console.log(orderId);
        onOrderPlaced(orderId);

        setOrderStatus("pending");
        if (orderStatus === "accepted") {
          
          navigate(`/customer/payment`, { state: { orderId, user, bookingData } });
        } else {
          // Display message if the order is rejected
          alert("Your order request has been rejected. Please check your email for details.");

      // navigate(`/customer/payment`, { state: { orderId, user, bookingData } });
      }
    }
    } catch (error) {
      // Handle errors
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div style={{ margin: "70px", fontFamily: "Arial, sans-serif" , fontSize:"20px"}}>
      <h2 style={{ margin: "5px", fontFamily: "Arial, sans-serif" , fontSize:"40px"}}>Your Details</h2>
      <div style={{ marginBottom: "20px",marginTop:"20px" }}>
        <label style={{ marginRight: "20px",marginTop:"15px" }}>Name:</label>
        <input type="text" value={name} style={{ marginRight: "20px",marginTop:"15px" }} disabled />
        <label style={{ marginRight: "20px",marginTop:"15px" }}>Email:</label>
        <input type="text" value={email} style={{ marginRight: "20px",marginTop:"15px" }} disabled />
        <label style={{ marginRight: "20px",marginTop:"15px" }}>Phone:</label>
        <input type="text" value={phone} style={{ marginRight: "20px",marginTop:"15px" }} disabled />
        <label style={{ marginRight: "20px",marginTop:"15px" }}>Address:</label>
        <input type="text" value={userAddress} style={{ marginRight: "20px",marginTop:"15px" }} disabled />
        <label style={{ marginRight: "20px",marginTop:"15px" }}>City:</label>
        <input type="text" value={userCity} style={{ marginRight: "20px",marginTop:"15px" }} disabled />
        <label style={{ marginRight: "20px",marginTop:"15px" }}>State:</label>
        <input type="text" value={userState} disabled />
      </div>

      <h2 style={{ marginTop: "70px", fontFamily: "Arial, sans-serif" , fontSize:"40px"}}>Order Details</h2>
      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" , marginTop:"10px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Menu Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Total Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Number of People</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Event</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{bookingData.items}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{bookingData.totalPrice}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{bookingData.numberOfPeople}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{bookingData.event}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{bookingData.address}, {bookingData.city}, {bookingData.state}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleOrder} style={{ marginTop: "30px", padding: "10px 20px", fontSize: "20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Place Order</button>
      </div>
    </div>
  );
};

export default Order;
