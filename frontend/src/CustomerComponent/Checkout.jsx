import React, { useState } from 'react'
import '../Css/checkout.css'

export default function Checkout() {

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [pid, setPid] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const handlesubmit = (event) => {
        event.preventDefault();
        // alert("The message is sent by "+email);
    }

    return (
        <div className='registration'>
            <div className='square'>
                <label>Full Name</label>
                <input type="text" className='name' name="name"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                /><br />

                <label>Time</label>
                <input type="time" className='time' name="time"
                    value={time} onChange={(e) => { setTime(e.target.value) }}
                /><br />

                <label>Date</label>
                <input type="date" className='date' name="date"
                    value={date} onChange={(e) => { setDate(e.target.value) }}
                /><br />

                <label>Address</label>
                <textarea className='address' rows="1" name="address" 
                    value={address} onChange={(e) => { setAddress(e.target.value) }}>
                </textarea><br />


                <label>Product Id</label>
                <input type="number" className='pid' name="pid"
                    value={pid} onChange={(e) => { setPid(e.target.value) }}
                /><br />

                <label>City</label>
                <input type="text" className='city' name="city"
                    value={city} onChange={(e) => { setCity(e.target.value) }}
                /><br />

                <label>State</label>
                <textarea className='state' rows="1" name="state" value={state} onChange={(e) => { setState(e.target.value) }}></textarea><br />

                <input type="submit" className="book bg-success" value="Book" onClick={handlesubmit} />
            </div>
        </div>
    )
}

