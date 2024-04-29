import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Caterermenudetails = () => {
  const [catererDetails, setCatererDetails] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items
  const { caterer_id } = useParams(); // Accessing the caterer_id parameter from the URL
  const location = useLocation();
  const { selectedEvent, numberOfPeople } = location.state;
  const navigate = useNavigate(); // Hook to navigate to other routes

  console.log(selectedEvent);
  console.log(numberOfPeople);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch caterer details
        const catererResponse = await axios.get(
          `http://localhost:7000/api/getcatererinfo/${caterer_id}`
        );
        setCatererDetails(catererResponse.data);

        // Fetch menus
        const menuResponse = await axios.get(
          `http://localhost:7000/api/getmenusdetails/${caterer_id}`
        );
        // Initialize selected property to false for each menu item
        const menusWithSelected = menuResponse.data.map((menu) => ({
          ...menu,
          selected: false,
        }));
        setMenus(menusWithSelected);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [caterer_id]);

  // Function to handle adding a dish to the cart
  const addToCart = (index) => {
    const updatedMenus = [...menus];
    updatedMenus[index].selected = !updatedMenus[index].selected;
    setMenus(updatedMenus);
    // Update selectedItems state with selected items
    const selected = updatedMenus.filter((menu) => menu.selected);
    setSelectedItems(selected);
    console.log("Selected items:", selected); // Check if selected items are updated
  };

  // Function to navigate to the cart page with selected items, event, and number of people data
  const toCartPage = () => {
    navigate(`/customer/cart`, {
      state: {
        selectedItems,
        selectedEvent,
        numberOfPeople,
        caterer_id: caterer_id,
      },
    });
  };

  return (
    <div>
      {/* Display caterer details */}
      {catererDetails && (
        <div>
          <h2
            style={{ marginTop: "10px", fontSize: "1.5em", fontWeight: "bold" }}
          >
            Welcome to {catererDetails.company} caterer
          </h2>
          <div>
            <h3
              style={{
                marginTop: "33px",
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              Contact Information
            </h3>
            <div>
              <p>Phone: {catererDetails.phone}</p>
              <p>Email: {catererDetails.email}</p>
              <p>Address: {catererDetails.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Display menus */}
      <h3
        style={{
          marginTop: "33px",
         // fontSize: "1.2em",
          fontWeight: "bold",
          fontSize:"50px",
          textDecoration:"underline",
        }}
      >
        Menu
      </h3>
      <div>
        {menus.map((menu, index) => (
          <div
            key={menu.id}
            style={{
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "70px",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={`http://localhost:7000/public/images/${menu.picture}`}
                alt={menu.foodname}
                style={{ width: "233px", height: "100px" }}
              />
              <div style={{ marginLeft: "100px", textAlign: "left" }}>
                <p>
                  <strong>FoodName: </strong> {menu.foodname}
                </p>
                <p>
                  <strong>Category: </strong>
                  {menu.category}
                </p>
                <p>
                  <strong>Description: </strong>
                  {menu.description}
                </p>
                <p>
                  <strong>Price: </strong> {menu.price} per person{" "}
                </p>
                <button
                  onClick={() => addToCart(index)}
                  style={{
                    background: menu.selected ? "red" : "green",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "2px solid black",
                    color: "white",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    width: "120px", // Fixed width
                    textAlign: "center", // Center text horizontally
                    margin: "5px", // Add some margin for spacing
                  }}
                >
                  {menu.selected ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={toCartPage}
        style={{
          background: "blue",
          padding: "10px",
          border: "2px solid black",
          color: "white",
          display: "block",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default Caterermenudetails;
