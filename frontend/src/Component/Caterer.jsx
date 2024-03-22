import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Css/admintable.css';

const Caterer = () => {
  const [re , setre] = useState(false);
  const [catererData, setCatererData] = useState([]);
  useEffect(() => {
    const dbData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/catererdetailes"
        );
        setCatererData(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    dbData();
  }, [re]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:7000/api/deletecaterer/${id}`
      )
      .then(() => (console.log("deleted Successfully")))
        .then(() => (setre((prev) => !prev)));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div style={{height:"500px",overflow:"auto"}}>
              <table style={{ backgroundColor: "lightblue",marginLeft:"30%",marginTop:"100px",borderCollapse: "collapse"}}>
        <thead >
          <tr style={{backgroundColor:"yellow"}}>
            <td>No.</td>
            <td>Name</td>
            <td>OrderId</td>
            <td>Phone No.</td>
            <td>Address</td>
            <td>City</td>
            <td>State</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
        {catererData.map((data) => (
          <tr key={data.caterer_id}>
            <td>{data.caterer_id}</td>
            <td>{data.name}</td>
            <td>OrderId</td>
            <td>{data.phone}</td>
            <td>{data.address}</td>
            <td>{data.city}</td>
            <td>{data.state}</td>
            <td>
              <button style={{border:"2px solid black",width:"100px",backgroundColor:"red"}}onClick={() => handleDelete(data.caterer_id)}>Delete</button>
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
