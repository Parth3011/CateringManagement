import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Orderdetail = ({ user }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/orders`,
          {
            params: { caterer_id: user.caterer_id },
          }
        );
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      // Perform necessary actions when accepting the order
      alert("You accepted the order");

      // Make API request to accept the order
      await axios.post(`http://localhost:7000/api/order/${orderId}/accept`);

      navigate(`/caterer/payment?orderId=${orderId}`);
      // navigate("/caterer/payment");
    } catch (error) {
      console.error("Error accepting order:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const description = prompt("Please enter the reason for rejection:");
      if (!description) return; // If description is empty, do nothing

      // Make the axios request to reject the order
      await axios.post(`http://localhost:7000/api/order/${orderId}/reject`, {
        description,
      });

      setOrderDetails((prevOrders) =>
        prevOrders.filter((order) => order.order.order_id !== orderId)
      ); 
      alert("Order rejected successfully");
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  if (!orderDetails.length && location.pathname === "/caterer/order") {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();

  return (
    <div style={styles.container}>
      <h2>Order Details</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.header}>Order ID</th>
              <th style={styles.header}>Name</th>
              <th style={styles.header}>Email</th>
              <th style={styles.header}>Phone Number</th>
              <th style={styles.header}>Event</th>
              <th style={styles.header}>No. of People</th>
              <th style={styles.header}>Menu</th>
              <th style={styles.header}>Date</th>
              <th style={styles.header}>Time</th>
              <th style={styles.header}>Address</th>
              <th style={styles.header}>City</th>
              <th style={styles.header}>State</th>
              <th style={styles.header}>Price</th>
              <th style={styles.header}>Action</th>
            </tr>
          </thead>
          <tbody>
          {orderDetails
              .filter((orderDetail) => {
                const bookingDate = new Date(orderDetail.event.date);
                // console.log(bookingDate);
                // console.log(currentDate);
                return bookingDate > currentDate; // Filter orders with future booking dates
              })
              .map((orderDetail) => (
                <tr key={orderDetail.order.order_id}>
                  <td style={styles.data}>{orderDetail.order.order_id}</td>
                  <td style={styles.data}>{orderDetail.customer.name}</td>
                  <td style={styles.data}>{orderDetail.customer.email}</td>
                  <td style={styles.data}>{orderDetail.customer.phone}</td>
                  <td style={styles.data}>{orderDetail.event.eventname}</td>
                  <td style={styles.data}>{orderDetail.event.no_of_people}</td>
                  <td style={styles.data}>{orderDetail.event.menuname}</td>
                  <td style={styles.data}>
                    {new Date(orderDetail.event.date).toLocaleDateString()}
                  </td>
                  <td style={styles.data}>
                    {formatTime(orderDetail.event.time)}
                  </td>
                  <td style={styles.data}>{orderDetail.event.address}</td>
                  <td style={styles.data}>{orderDetail.event.city}</td>
                  <td style={styles.data}>{orderDetail.event.state}</td>
                  <td style={styles.data}>{orderDetail.event.TotalPrice}</td>
                  <td style={styles.actionCell}>
                    {orderDetail.order.orderstatus === "accepted" ? (
                      "Payment Received"
                    ) : (
                      <>
                        <button
                          style={styles.acceptButton}
                          onClick={() =>
                            handleAcceptOrder(orderDetail.order.order_id)
                          }
                        >
                          Accept Order
                        </button>
                        <button
                          style={styles.rejectButton}
                          onClick={() =>
                            handleRejectOrder(orderDetail.order.order_id)
                          }
                        >
                          Reject Order
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10) % 12 || 12;
  const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
  return `${hour}:${minutes} ${period}`;
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  tableContainer: {
    overflowY: "auto",
    maxHeight: "600px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    backgroundColor: "#f2f2f2",
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  data: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  actionCell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  acceptButton: {
    cursor: "pointer",
    marginRight: "5px",
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    border: "none",
    backgroundColor: "#28a745",
    fontSize: "16px",
  },
  rejectButton: {
    cursor: "pointer",
    marginRight: "5px",
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    border: "none",
    backgroundColor: "#dc3545",
    fontSize: "16px",
  },
};

export default Orderdetail;
