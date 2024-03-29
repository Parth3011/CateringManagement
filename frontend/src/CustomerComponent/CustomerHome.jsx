import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerHome = ({ user }) => {
  const [inputData] = useState(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [menus, setMenus] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu data from the backend API when the component mounts
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/getcustomermenu",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data.data;
      console.log(data);
      setMenus(data); // Update state with fetched menu data
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform search functionality here
  };

  // Group menus by company name and concatenate categories and descriptions
  const groupedMenus = Object.values(
    menus.reduce((acc, menu) => {
      if (!acc[menu.company]) {
        acc[menu.company] = {
          ...menu,
          category: [menu.category],
          description: [menu.description],
        };
      } else {
        acc[menu.company].category.push(menu.category);
        acc[menu.company].description.push(menu.description);
      }
      return acc;
    }, {})
  );

  const handleview = (caterer_id)=>{
    navigate(`/customer/cmenu/${caterer_id}`);
  }

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4883.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "yellow",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "50px", 
          }}
        >
          <h1>Welcome {inputData.name}</h1>
          {/* Search Bar */}
          <div
            style={{
              margin: "30px 0",
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 500, 
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search category..."
              style={{
                padding: "5px",
                fontSize: "0.8em", 
                borderRadius: "50px",
                border: "2px solid #ccc",
                color: "black",
                marginRight: "10px",
              }}
            />
            <span
              role="img"
              aria-label="search"
              style={{
                fontSize: "1.5em",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              🔍
            </span>{" "}
            {/* Unicode search icon */}
            {/* Shift + ctrl + u */}
            {/* window + . for emogi */}
          </div>

          {groupedMenus.length > 0 ? (
            <div
              style={{
                maxHeight: "calc(100vh - 300px)", 
                overflowY: "auto",
                margin: "10px",
              }}
            >
              <table
                style={{
                  width: "1333px",
                  borderCollapse: "collapse",
                  border: "5px solid black",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "white", color: "black" }}>
                    <th style={{ padding: "5px" }}>Company</th>
                    <th style={{ padding: "5px" }}>Category</th>
                    <th style={{ padding: "5px" }}>Description</th>
                    <th style={{ padding: "5px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedMenus.map((menu) => (
                    <tr key={menu.id} style={{ backgroundColor: "#333" }}>
                      <td style={{ padding: "10px" }}>{menu.company}</td>

                      {/* category */}

                      <td style={{ padding: "5px" }}>
                        {menu.category.map((category, index) => (
                          <div key={index}>
                            <span style={{ color: "white" }}>{index + 1}. </span>{" "}
                            <span style={{ color: "red" }}>{category}</span>
                          </div>
                        ))}
                      </td>

                      {/* description */}

                      <td
                        style={{
                          padding: "5px",
                          maxWidth: "200px",
                          wordWrap: "break-word",
                        }}
                      >
                        {menu.description.map((description, index) => (
                          <div key={index}>
                            <span style={{ color: "white" }}>{index + 1}.</span>{" "}
                            <span style={{ color: "red" }}>{description}</span>
                          </div>
                        ))}
                      </td>

                      <td style={{ width: "150px" }}>
                        <button onClick={() => handleview(menu.caterer_id)}
                          style={{
                            padding: "5px 10px",
                            marginLeft: "30px",
                            width: "70px",
                            borderRadius: "5px",
                            background: "yellow",
                            color: "black",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "white" }}>
              No menu data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
