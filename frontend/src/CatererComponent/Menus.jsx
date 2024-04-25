import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/admintable.css";
import { useNavigate } from "react-router-dom";

const Menus = ({user}) => {
  const [re, setre] = useState(false);
  const [menuData, setmenuData] = useState([]);
  useEffect(() => {
    const dbData = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/getmenu", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data.status === 200) {
          console.log("data get");
          const filteredMenuData = res.data.data.filter((item) => item.caterer_id === user.caterer_id);
          setmenuData(filteredMenuData);
          //setmenuData(res.data.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    dbData();
  }, [re]);

  const handleDelete = async (id) => {
    const confirmdelete = window.confirm("Are you sure you want to delete?");
    try {
      if (confirmdelete) {
        await axios
          .delete(`http://localhost:7000/api/deletemenu/${id}`)
          .then(() => console.log("deleted Successfully"))
          .then(() => setre((prev) => !prev));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleUpdate = async (id) => {
    try {
      navigate(`/caterer/UpdateMenu/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      navigate("/caterer/catererMenu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div style={{ height: "700px" ,overflow: "auto" , scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <style>
          {`
            /* Custom scrollbar for WebKit */
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <table
          style={{
            backgroundColor: "lightblue",
            marginLeft: "20%",
            width:"70%",
            marginTop: "100px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "black"  }}>
              <td style={{ color: "white", textAlign: "center" ,width:"100px"}}>Picture</td>
              <td style={{ color: "white", textAlign: "center" }}>foodname</td>
              <td style={{ color: "white", textAlign: "center" }}>Category</td>
              <td style={{ color: "white", textAlign: "center" }}>price</td>
              <td style={{ color: "white", textAlign: "center",width:"300px" }}>description</td>
              <td style={{ color: "white", textAlign: "center" }}>status</td>
              <td style={{ color: "white", textAlign: "center", width:"300px" }}>Action</td>
            </tr>
          </thead>
          <tbody>
            {menuData.map((data) => (
              <tr key={data.menu_id}>
                <td>
                  <img
                    className="image"
                    src={`http://localhost:7000/public/images/${data.picture}`}
                    alt="food"
                  />
                </td>

                {console.log(`/public/images/${data.picture}`)}
                <td>{data.foodname}</td>
                <td>{data.category}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td>{data.status}</td>
                <td>
                <button
                    style={{
                      border: "2px solid black",
                      width: "100px",
                      backgroundColor: "red",
                      color: "white",
                      marginLeft: "20px",
                    }}
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      marginLeft: "20px",
                      border: "2px solid black",
                      width: "100px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                    onClick={() => handleUpdate(data.id)}
                  >
                    Update
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{
            border: "2px solid black",
            width: "100px",
            backgroundColor: "green",
            marginLeft: "800px",
            marginTop: "10px",
          }}
          onClick={handleAdd}
        >
          Add Menu
        </button>
      </div>
      <div style={{marginTop:"30px"}}></div>
    </div>
  );
};

export default Menus;
