import axios from 'axios';
import React, { useState } from 'react'

const ForgetPassword = () => {
  const [ inputdata, setinputData] = useState("");
  


  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
  }


    const onmail = (e) => {
        e.preventDefault();
        console.log("outside try");
        try {
            console.log("in onmail");
             axios.post('http://localhost:7000/api/forgetpassword', inputdata)
            .then((resp) => console.log(resp))//alert("successfully changed"))
            .then((err) => console.log(err))
        } catch (e) {
          console.error('Error submitting form:', e);
          alert('An error occurred while submitting the form');
        }
      };
    
  return (
    <div>
       <input type="email" name="email" value={inputdata.email} onChange={handledata} placeholder="Enter email"/> 
       <button onClick={onmail} type='submit'>Send mail</button>
    </div>
  )
}

export default ForgetPassword
