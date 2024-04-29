import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orderhistory = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState({});
  const user = JSON.parse(localStorage.getItem('user')); 
  const customerId = user ? user.customer_id : null; 

  useEffect(() => {
    if (!customerId) {
      console.error('Customer ID not found in user object');
      return; 
    }
  
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/orders/customer/${customerId}`);
        const ordersData = response.data.filter(order => {
          if (order.orderstatus === 'accepted') {
            const currentDate = new Date();
            const orderDate = new Date(order.date);
            // Show the order if payment is done or if the current date is less than or equal to the order date
            return payments[order.order_id]?.payment_status === 'done' || currentDate <= orderDate;
          }
          // Show rejected orders
          return order.orderstatus === 'rejected';
        });
        setOrders(ordersData);
        const resp = await axios.get(`http://localhost:7000/api/payments/order`);
        setPayments(resp.data.reduce((acc, payment) => {
          acc[payment.order_id] = payment;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrderHistory();
  }, [customerId, payments]); // Add payments to the dependency array
  

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
    return `${hour}:${minutes} ${period}`;
  };

  const navigate = useNavigate();

  const handleSubmit = (orderId) => {
    console.log(orderId);
    navigate('/customer/payment', { state: { orderId: orderId } });
  };
  

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Event</th>
              <th>Menu Name</th>
              <th>Number of People</th>
              <th>Order Status</th>
              <th>Company</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Rejection</th>
              <th>Payment Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.eventname}</td>
                <td>{order.menuname}</td>
                <td>{order.no_of_people}</td>
                <td>{order.orderstatus}</td>
                <td>{order.company}</td>
                <td>{new Date(order.date).toLocaleDateString('en-IN')}</td>
                <td>{formatTime(order.time)}</td>
                <td>{order.phone}</td>
                <td>{order.rejection_status}</td>
                <td>
                  {
                    (order.orderstatus === 'accepted') ? (
                      (payments[order.order_id]?.payment_status === 'done') ? (
                        <p className="payment-done">Payment Done</p>
                      ) : (
                        <button className="pay-now" onClick={() => handleSubmit(order.order_id)}>Pay Now</button>
                      )
                    ) : (
                      (order.orderstatus === 'rejected') ?<button className="pending" disabled>You can't pay</button>:null
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>{`
        .order-history {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .pay-now {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
        }
        .pay-now:hover {
          background-color: #0056b3;
        }
        .payment-done {
          color: green;
        }
        .pending {
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default Orderhistory;
