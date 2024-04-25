import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/admintable.css";

const Caterer = () => {
  const [re, setRe] = useState(false);
  const [catererData, setCatererData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/catererdetailes");
        setCatererData(res.data);
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
        await axios.delete(`http://localhost:7000/api/deletecaterer/${id}`);
        console.log("Deleted Successfully");
        setRe((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ height: "500px", overflow: "auto" }}>
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
            {catererData.map((data) => (
              <tr key={data.caterer_id}>
                <td>{data.caterer_id}</td>
                <td>{data.name}</td>
                <td>{data.order_ids}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(data.caterer_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Caterer;
