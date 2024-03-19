import React, {useState} from 'react'

import '../Css/signup.css'

export default function Profile() {
    const[uname,setUname] = useState("");
    const[email,setEmail] = useState("");
    const[pwd,setPwd] = useState("");
    const[phone,setPhone] = useState("");
    const[address,setAddress] = useState("");
    const[pin,setPin] = useState("");
    const[city,setCity] = useState("");
    const[state,setState] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
    };

    return (
    <div className='registration'>
    <h1>Profile</h1>
    <div className='box'>
      <label>Username</label>
      <input type = "text" className='uname' name="uname" 
                value={uname} onChange={(e)=>{setUname(e.target.value)}} 
      /><br/>


      <label>Email</label>
      <input type = "text" className='email' name="email" 
             value={email} onChange={(e)=>{setEmail(e.target.value)}}
      /><br/>
      
      {/* <label>Company Name</label>
      <input type = "text" className='company' name="company" 
            value={company} onChange={(e)=>{setCompany(e.target.value)}}
      /><br/> */}

      <label>Password</label>
      <input type = "password" className='pwd' name="pwd" 
            value={pwd} onChange={(e)=>{setPwd(e.target.value)}} 
      /><br/>


      <label>Phone No.</label>
      <input type = "number" className='phone' name="phone" 
                value={phone} onChange={(e)=>{setPhone(e.target.value)}} 
      /><br/>

      <label>Address</label>
      <textarea className='address' rows="1" name="address" 
             value={address} onChange={(e)=>{setAddress(e.target.value)}}
      ></textarea><br/>

      <label>Pincode</label>
      <input type = "number" className='pin' name="pin" 
                value={pin} onChange={(e)=>{setPin(e.target.value)}} 
      /><br/> 

      <label>City</label>
      <input type = "text" className='city' name="city" 
            value={city} onChange={(e)=>{setCity(e.target.value)}} 
      /><br/>

      <label>State</label>
      <input type = "text" className='state' name="state" 
            value={state} onChange={(e)=>{setState(e.target.value)}} 
      /><br/>

      <input type="submit" className="register bg-success" value="Update" onClick={handleSubmit} />

    </div>
    </div>
  )
}

