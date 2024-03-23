import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Css/menu.css";

const UpdateMenu = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/getmenu1/${id}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (res.data.status === 200) {
          setMenuItem(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuItem();
  }, [id]);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setMenuItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update menu item with updated menuItem state
      // Example:
      // await axios.put(`http://localhost:7000/api/updateMenu/${id}`, menuItem);
      console.log("Menu item updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "yellow" }}>
      {menuItem && (
        <form style={{ marginTop: "50px" }} onSubmit={handleSubmit}>
          <label>Food Name</label>
          <input
            type="text"
            className="foodname"
            name="foodname"
            value={menuItem.foodname}
            onChange={handleDataChange}
          />
          <br />

          <label>Picture Food</label>
          <input
            type="file"
            className="picture"
            name="picture"
            onChange={handleDataChange}
          />
          <br />

          <label>Category</label>
          <input
            type="text"
            className="category"
            name="category"
            value={menuItem.category}
            onChange={handleDataChange}
          />
          <br />

          <label>Food Price</label>
          <input
            type="number"
            className="price"
            name="price"
            value={menuItem.price}
            onChange={handleDataChange}
          />
          <br />

          <label>status</label>
          <input
            type="text"
            className="status"
            name="status"
            value={menuItem.status}
            onChange={handleDataChange}
          />
          <br />

          <label>Description</label>
          <textarea
            className="desc"
            rows="1"
            name="description"
            value={menuItem.description}
            onChange={handleDataChange}
          ></textarea>
          <br />

          <button type="submit" style={{ backgroundColor: "green", marginTop: "30px", marginLeft: "300px" }}>Update</button>
        </form>
      )}
    </div>
  );
};

export default UpdateMenu;
