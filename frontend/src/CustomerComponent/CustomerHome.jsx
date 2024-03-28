import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerHome = ({ user }) => {
  const [inputData, setInputData] = useState(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [menus, setMenus] = useState([]);

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

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4883.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "700px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            marginTop: "330px",
            transform: "translate(-50%, -50%)",
            color: "yellow",
            fontSize: "1em",
            fontWeight: "bold",
            textAlign: "center",
            width: "90%",
          }}
        >
          <h1>Welcome {inputData.name}</h1>
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
              marginBottom: "20px",
              marginLeft: "33%",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search category..."
              style={{
                padding: "5px",
                fontSize: "0.8em", // Smaller font size
                borderRadius: "50px",
                border: "1px solid #ccc",
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
            <table
              style={{
                width: "90%",
                height:"500px",
                overflow:"auto",
                borderCollapse: "collapse",
                border:"5px solid black",
                color: "white",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "white", color: "black" }}>
                  <th style={{ padding: "10px" }}>Company</th>
                  <th style={{ padding: "10px" }}>Category</th>
                  <th style={{ padding: "10px" }}>Description</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedMenus.map((menu) => (
                  <tr key={menu.id} style={{ backgroundColor: "#333" }}>
                    <td style={{ paddingTop: "10px" }}>{menu.company}</td>

                    {/* category */}

                    <td style={{ padding: "10px" }}>
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
                        padding: "10px",
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

                    <td style={{ padding: "10px" }}>
                      <button
                        style={{
                          padding: "5px 10px",
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
