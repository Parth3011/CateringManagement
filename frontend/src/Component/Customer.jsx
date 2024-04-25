import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/admintable.css";

const Customer = () => {
  const [re, setRe] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/customerdetailes");
        setCustomerData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [re]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    try {
      if (confirmDelete) {
        await axios.delete(`http://localhost:7000/api/deletecustomer/${id}`);
        console.log("Deleted Successfully");
        setRe((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-header">
              <th>No.</th>
              <th>Name</th>
              <th>Order ID</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((data) => (
              <tr key={data.customer_id}>
                <td>{data.customer_id}</td>
                <td>{data.name}</td>
                <td>{data.order_ids}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(data.customer_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
