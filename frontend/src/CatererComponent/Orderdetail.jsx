import React, { useState, useEffect } from "react";
import axios from "axios";

const Orderdetail = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleAcceptOrder = () => {
    console.log("Order accepted");
  };

  const handleRejectOrder = () => {
    console.log("Order rejected");
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display order details */}
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Event</th>
            <th>No. of People</th>
            <th>Menu</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.order.order_id}</td>  
            <td>{orderDetails.customer.name}</td>
            <td>{orderDetails.customer.email}</td>
            <td>{orderDetails.customer.phone}</td>
            <td>{orderDetails.event.eventname}</td>
            <td>{orderDetails.event.no_of_people}</td>
            <td>{orderDetails.event.menuname}</td>
            <td>{orderDetails.event.date}</td>
            <td>{orderDetails.event.time}</td>
            <td>{orderDetails.event.address}</td>
            <td>{orderDetails.event.city}</td>
            <td>{orderDetails.event.state}</td>
            <td>{orderDetails.event.TotalPrice}</td>            
            <td>
              <button onClick={handleAcceptOrder} style={{border:"2px solid black" , backgroundColor:"green"}}>Accept Order</button>
              <button onClick={handleRejectOrder} style={{border:"2px solid black", backgroundColor:"red",marginTop:"5px"}}>Reject Order</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orderdetail;
