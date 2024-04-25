import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerHome = ({ user }) => {
  const [inputData] = useState(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [menus, setMenus] = useState([]);
  const [groupedMenus, setGroupedMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(""); // New state for selected event
  const [numberOfPeople, setNumberOfPeople] = useState(1); // New state for number of people
  const [eventError, setEventError] = useState(false); // New state for event validation error

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu data from the backend API when the component mounts
    fetchMenus();
  }, [user]);

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

      const groupedMenus = Object.values(
        data.reduce((acc, menu) => {
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
      setGroupedMenus(groupedMenus);
      setFilteredMenus(groupedMenus); // Initialize filteredMenus with groupedMenus
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      // If the search query is empty, display all menus without filtering or sorting
      setFilteredMenus(groupedMenus);
      return;
    }

    // Filter menus based on category
    const filteredMenus = groupedMenus.filter((menu) => {
      const matches = menu.category.filter((category) =>
        category.toLowerCase().includes(query)
      ).length;
      return matches > 0; // Only include menus with at least one match
    });

    // Sort filtered menus based on the number of matches in descending order
    filteredMenus.sort((a, b) => {
      const matchesA = a.category.filter((category) =>
        category.toLowerCase().includes(query)
      ).length;
      const matchesB = b.category.filter((category) =>
        category.toLowerCase().includes(query)
      ).length;
      return matchesB - matchesA; // Sort in descending order
    });

    setFilteredMenus(filteredMenus);
  };

  const handleView = (caterer_id) => {
    if (!selectedEvent) {
      // If no event is selected, set the eventError state to true
      setEventError(true);
      return;
    }
    navigate(`/customer/cmenu/${caterer_id}`, {
      state: {
        selectedEvent,
        numberOfPeople,
      },
    });
  };

  return (
    <div>
      {/* Content with background color */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "calc(100vh - 30px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 800 }}>
          <h1>Welcome {inputData.name}</h1>
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search category..."
              style={{
                padding: "8px",
                fontSize: "1em",
                borderRadius: "8px",
                border: "2px solid #ccc",
                marginRight: "10px",
                flex: 1,
              }}
            />
            <button
              style={{
                padding: "8px 16px",
                fontSize: "1em",
                borderRadius: "8px",
                border: "none",
                background: "#ffc107",
                color: "black",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {/* Event selection and Number of people input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Event selection */}
            <div style={{ marginRight: "10px" }}>
              <label htmlFor="event">Select Event: </label>
              <select
                id="event"
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value);
                  setEventError(false); // Reset eventError state when the event is selected
                }}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                }}
              >
                <option value="">--Select Event--</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                {/* Add more options as needed */}
              </select>
              {eventError && (
                <p style={{ color: "red", margin: "5px 0 0", fontSize: "0.8em" }}>
                  Please select an event.
                </p>
              )}
            </div>

            {/* Number of people input */}
            <div>
              <label htmlFor="numberOfPeople">Number of People: </label>
              <input
                type="number"
                id="numberOfPeople"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                min="1"
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                }}
              />
            </div>
          </div>

          {groupedMenus.length > 0 ? (
            <div
              style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#ffc107", color: "#333" }}>
                    <th style={{ padding: "8px" }}>Company</th>
                    <th style={{ padding: "8px" }}>Category</th>
                    <th style={{ padding: "8px" }}>Description</th>
                    <th style={{ padding: "8px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenus.map((menu, index) => (
                    <tr
                      key={menu.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#fff",
                        color: "#333",
                      }}
                    >
                      <td style={{ padding: "8px" }}>{menu.company}</td>

                      {/* category */}

                      <td style={{ padding: "8px" }}>
                        {menu.category.map((category, index) => (
                          <div key={index}>
                            <span>{index + 1}. </span>
                            <span style={{ color: "black" }}>{category}</span>
                          </div>
                        ))}
                      </td>

                      {/* description */}

                      <td
                        style={{
                          padding: "8px",
                          maxWidth: "200px",
                          wordWrap: "break-word",
                        }}
                      >
                        {menu.description.map((description, index) => (
                          <div key={index}>
                            <span>{index + 1}.</span>
                            <span style={{ color: "black" }}>
                              {description}
                            </span>
                          </div>
                        ))}
                      </td>

                      <td style={{ padding: "8px" }}>
                        <button
                          onClick={() => handleView(menu.caterer_id)}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "5px",
                            background: "#ffc107",
                            color: "#333",
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
            <p style={{ textAlign: "center" }}>No menu data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
