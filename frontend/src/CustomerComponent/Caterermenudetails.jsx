import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Caterermenudetails = () => {
  const [catererDetails, setCatererDetails] = useState(null);
  const [menus, setMenus] = useState([]);
  const { caterer_id } = useParams(); // Accessing the caterer_id parameter from the URL
  console.log(caterer_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch caterer details
        const catererResponse = await axios.get(
          `http://localhost:7000/api/getcatererinfo/${caterer_id}`
        );
        console.log(catererResponse.data);
        setCatererDetails(catererResponse.data);

        // Fetch menus
        const menuResponse = await axios.get(
          `http://localhost:7000/api/getmenusdetails/${caterer_id}`
        );
        console.log(menuResponse.data);
        setMenus(menuResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [caterer_id]);

  return (
    <div>
      {/* Display caterer details */}
      {catererDetails && (
        <div>
          <h2 style={{marginTop:"10px",fontSize: "1.5em", fontWeight: "bold"}}>Welcome to {catererDetails.company} caterer</h2>
          <div>
            <h3 style={{marginTop:"33px",fontSize: "1.2em", fontWeight: "bold"}}>Contact Information</h3>
            <p style={{marginTop:"15px"}}>Phone: {catererDetails.phone}</p>
            <p>Email: {catererDetails.email}</p>
            <p>Address: {catererDetails.address}</p>
          </div>
        </div>
      )}

      {/* Display menus */}
      <h3 style={{ marginTop: '50px',fontSize: "1.2em", fontWeight: "bold"}}>Menus</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {menus.map((menu) => (
          <div key={menu.id} style={{ margin: '20px', textAlign: 'center' }}>
            <img src={`http://localhost:7000/public/images/${menu.picture}`} alt={menu.foodname} style={{ width: '233px', height: '100px' }} />
            <p style={{width:'250px'}}>FoodName: {menu.foodname}</p>
            <p style={{width:'250px'}}>Category: {menu.category}</p>
            <p style={{width:'250px'}}>Description: {menu.description}</p>
            <p style={{width:'250px'}}>Price: {menu.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Caterermenudetails;
