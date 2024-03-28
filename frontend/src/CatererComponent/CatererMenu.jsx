import React, { useState } from "react";
import "../Css/menu.css";
import axios from "axios";

export default function CatererMenu({user}) {

  // console.log(user.company);

  const data = {
    foodname: "",
    category: "",
    price: "",
    desc: "",
    status: "",
  };
  const [inputdata, setinputData] = useState(data);
  const [file, setFile] = useState("");

  const handledata = (e) => {
    setinputData({ ...inputdata, [e.target.name]: e.target.value });
    console.log(inputdata);
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("foodname", inputdata.foodname);
      formData.append("category", inputdata.category);
      formData.append("price", inputdata.price);
      formData.append("status", inputdata.status);
      formData.append("desc", inputdata.desc);
      formData.append("caterer_id",user.caterer_id);
      // formData.append("company",user.company);


      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      console.log(formData);
      const resp = await axios.post(
        "http://localhost:7000/api/menu",
        formData,
        config
      );
      alert("Successfully Added");
      console.log(resp);
    } catch (e) {
      console.error("Error submitting form:", e);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="registration">
      <h1>Menu</h1>
      <div className="square">

        <label>Food Name</label>
        <input
          type="text"
          className="foodname"
          name="foodname"
          value={inputdata.foodname}
          onChange={handledata}
        />
        <br />

        <label>Picture Food</label>
        <input
          type="file"
          className="picture"
          name="picture"
          onChange={handleImageChange}
        />
        <br />

        <label>Category</label>
        <input
          type="text"
          className="category"
          name="category"
          value={inputdata.category}
          onChange={handledata}
        />
        <br />

        <label>Food Price</label>
        <input
          type="number"
          className="price"
          name="price"
          value={inputdata.price}
          onChange={handledata}
        />
        <br />

        <label>status</label>
        <input
          type="text"
          className="status"
          name="status"
          value={inputdata.status}
          onChange={handledata}
        />
        <br />

        <label>Description</label>
        <textarea
          className="desc"
          rows="1"
          name="desc"
          value={inputdata.desc}
          onChange={handledata}
        ></textarea>
        <br />

        <input
          type="submit"
          className="add bg-success"
          value="Add"
          encType="multipart/form-data"
          onClick={handlesubmit}
        />
      </div>
    </div>
  );
}
