import React, { useEffect, useState } from "react";

const AdminHome = ({user}) => {

    const [inputdata,setinputData] = useState(user);

    useEffect(()=>{
      setinputData(user);
    },[user]);

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4883.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "650px",
          position: "relative",
        }} >
        <div
          style={{
            position: "absolute", 
            left: "70%", 
            top:"250px",
            transform: "translate(-50%, -50%)", 
            color: "yellow", 
            fontSize: "3em", 
            fontWeight: "bold" 
          }}>

          <h1>Welcome to Catering</h1>
          <h1>Management System</h1><br />
          <h1>{inputdata.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
