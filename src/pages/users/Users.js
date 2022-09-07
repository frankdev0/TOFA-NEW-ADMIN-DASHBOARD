

import React, { useState } from "react";
import cherry from '../../assets/cherry.png';
import "./user.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";


const Users = () => {
    const [file, setFile] = useState("");
  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
      <Navbar/>

      <div className="top">
        <h1>Add New Products</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img src={file ? URL.createObjectURL(file) : cherry} alt="product pic" />
        </div>
        <div className="right">
          <form className="form_description">
            <div className="formInput">
              <label className="label_description" htmlFor="file">
                Image: <DriveFolderUploadIcon className="icon" />
              </label>
              <input
                className="productInput"
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="formInput">
              <label className="label_description">User Name</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Email</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Order number</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Status</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Description</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Destination</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <div className="formInput">
              <label className="label_description">Port</label>
              <input className="productInput" type="text" placeholder="" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>

      

      </div>
    </div>
      
  );
};

export default Users;