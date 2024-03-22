import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function FirstPage() {
    
    const navigate = useNavigate();

    const handlesubmit = () => {
        navigate("/login")
    }

    return (
        <div>
                <button onClick={handlesubmit} style={{border:"2px solid black", marginLeft:"50%",marginTop:"300px",backgroundColor:"green",width:"150px"}}>Get Started</button>         
        </div>
    )
}



// export const bodyStyle = {
//     margin: "0",
//     padding: "0",
//     backgroundImage: url('https://img.freepik.com/free-photo/vintage-old-rustic-cutlery-dark_1220-4883.jpg'),
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
// };