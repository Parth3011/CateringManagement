import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// { orderId }
const CatererPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/order/${orderId}/payment`);
        setPaymentStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    };

    fetchPaymentStatus();
  }, [orderId]);

  const handleGoBack = () => {
    // Pass payment status back as a query parameter when navigating back
    navigate(`/caterer/order?paymentStatus=${paymentStatus}`);
  };

  return (
    <div>
      <h2>Payment Status</h2>
      {paymentStatus ? (
        <div>
          <p>Payment Status: {paymentStatus}</p>
          <button onClick={handleGoBack} style={styles.button}>Go Back to Order Page</button>
        </div>
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CatererPayment;
