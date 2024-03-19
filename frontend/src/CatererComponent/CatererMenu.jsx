import React, { useState } from 'react'
import '../Css/menu.css'

export default function CatererMenu() {

    const [name, setName] = useState("");
    const [foodname, setFoodName] = useState("");
    const [picture, setPicture] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");

    const handlesubmit = (event) => {
        event.preventDefault();
        // alert("The message is sent by "+email);
    }

    return (
        <div className='registration'>
            <h1>Menu</h1>
            <div className='square'>
                <label>CatererName</label>
                <input type="text" className='name' name="name"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                /><br />



                <label>Food Name</label>
                <input type="text" className='foodname' name="foodname"
                    value={foodname} onChange={(e) => { setFoodName(e.target.value) }}
                /><br />

                <label>Picture Food</label>
                <input type="file" className='picture' name="picture"
                    value={picture} onChange={(e) => { setPicture(e.target.value) }}
                /><br />

                <label>Category</label>
                <input type="text" className='category' name="category"
                    value={category} onChange={(e) => { setCategory(e.target.value) }}
                /><br />


                <label>Food Price</label>
                <input type="number" className='price' name="price"
                    value={price} onChange={(e) => { setPrice(e.target.value) }}
                /><br />

                <label>status</label>
                <input type="text" className='status' name="status"
                    value={status} onChange={(e) => { setStatus(e.target.value) }}
                /><br />

                <label>Description</label>
                <textarea className='desc' rows="1" name="desc" value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea><br />

                <input type="submit" className="add bg-success" value="Add" onClick={handlesubmit} />
            </div>
        </div>
    )
}
