import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = location.state;
  //const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/orders/${orderId}`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/payment', {
        amount: orderDetails.event.TotalPrice * 100,
        orderId: orderId,
        menuname: orderDetails.event.menuname,
      });

      const { data } = response;
      console.log(data);
      console.log(data.amount);

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: 'INR',
        name: orderDetails.caterer.company,
        description: 'Dummy Payment',
        order_id: data.order_id,
        handler: function (response) {
          console.log('Payment successful:', response);
          axios.post('http://localhost:7000/api/payment/success', {
            order_id: orderId,
            payment_id: response.razorpay_payment_id,
            price:orderDetails.event.TotalPrice,
          }).then((response) => {
            console.log('Payment success data sent to server:', response.data);
          }).catch((error) => {
            console.error('Error sending payment success data to server:', error);
          });
        },
        prefill: {
          name: orderDetails.customer.name,
          email: orderDetails.customer.email,
          contact: orderDetails.customer.phone,
        },
      };

      // console.log(options);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new window.Razorpay(options);
        console.log("hi");
        rzp.open();
        console.log("bye");
      };
      console.log(script);
      document.body.appendChild(script);

    } catch (error) {
      console.log(error);
      console.error('Error initiating payment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const eventDate = new Date(orderDetails.event.date).toLocaleDateString();
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
    return `${hour}:${minutes} ${period}`;
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ fontSize: "50px", marginBottom: "20px", textDecoration:"underline" }}>Payment</h1>
      {orderDetails && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>

          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom:"30px" }}>Customer Details</h2>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px" }}>
                <p><strong>Name:</strong></p>
                <input type="text" value={orderDetails.customer.name} disabled />
              </div>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px" }}>
                <p><strong>Email:</strong></p>
                <input type="email" value={orderDetails.customer.email} disabled />
              </div>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Phone:</strong></p>
                <input type="text" value={orderDetails.customer.phone} disabled />
              </div>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Address:</strong></p>
                <input type="text" value={orderDetails.customer.address} disabled />
              </div>
              <div style={{ marginRight: "20px", marginBottom: "10px", marginLeft:"5px" }}>
                <p><strong>City:</strong></p>
                <input type="text" value={orderDetails.customer.city} disabled />
              </div>
              <div style={{ marginBottom: "10px", marginLeft:"5px" }}>
                <p><strong>State:</strong></p>
                <input type="text" value={orderDetails.customer.state} disabled />
              </div>
            </div>
          </div>

          <hr style={{ margin: "20px 0", border: "3px solid" }} />
          <div style={{ marginBottom: "20px" }}>
            
          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom:"30px" }}>Caterer Details</h2>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Caterer ID:</strong></p>
                <input type="text" value={orderDetails.caterer.caterer_id} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Caterer Name:</strong></p>
                <input type="text" value={orderDetails.caterer.name} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Caterer email:</strong></p>
                <input type="text" value={orderDetails.caterer.email} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Company Name:</strong></p>
                <input type="text" value={orderDetails.caterer.company} disabled />
              </div>
            </div>
          </div>

          <hr style={{ margin: "20px 0", border: "3px solid" }} />
          <div style={{ marginBottom: "20px" }}>
          
          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom:"30px" }}>Order Details</h2>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div style={{ marginRight: "20px", marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Order ID:</strong></p>
                <input type="text" value={orderId} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Event Name:</strong></p>
                <input type="text" value={orderDetails.event.eventname} disabled />
              </div>
              <div style={{ marginBottom: "10px", marginLeft:"5px" }}>
                <p><strong>No of People:</strong></p>
                <input type="text" value={orderDetails.event.no_of_people} disabled />
              </div>
              <div style={{ marginBottom: "10px", marginLeft:"5px" }}>
                <p><strong>Order Food:</strong></p>
                <input type="text" value={orderDetails.event.menuname} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Address:</strong></p>
                <input type="text" value={orderDetails.event.address} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>City:</strong></p>
                <input type="text" value={orderDetails.event.city} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>State:</strong></p>
                <input type="text" value={orderDetails.event.state} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Date:</strong></p>
                <input type="text" value={eventDate} disabled />
              </div>
              <div style={{ marginBottom: "10px" , marginLeft:"5px"}}>
                <p><strong>Time:</strong></p>
                <input type="text" value={formatTime(orderDetails.event.time)} disabled />
              </div>
              <div style={{ marginBottom: "10px", marginLeft:"5px" }}>
                <p><strong>Price:</strong></p>
                <input type="text" value={orderDetails.event.TotalPrice} disabled />
              </div>
            </div>
            <div style={{ marginBottom: "30px", marginLeft: "50px", marginTop: "50px", display: "flex", justifyContent: "center" }}>
            <button style={styles.payButton} onClick={handlePayment}>Pay Here</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  payButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  }
  };

export default Payment;


