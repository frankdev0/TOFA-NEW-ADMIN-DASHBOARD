import React, { useState } from "react";
import cherry from "../../assets/cherry.png";
import "./user.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const CreateUsers = () => {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <div className="single">
            <div style={{ textAlign: "left" }} className="my-5">
              <h1>Add User</h1>
            </div>

            <form className="" onSubmit={handleSubmit}>
              <div className="row">
                <div className=" col-6 inputFields">
                  <div className="my-2">
                    <label className="l" htmlFor="file">
                      Image: <DriveFolderUploadIcon className="icon" />
                    </label>
                    <input
                      className="p"
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <label className="l">Full Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    name="fullName"
                    onChange={handleChange}
                  />

                  <label className="la">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder=""
                    name="email"
                    onChange={handleChange}
                  />

                  <label className="lab">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder=""
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <img
                    src={file ? URL.createObjectURL(file) : cherry}
                    alt="product pic"
                    className="left"
                  />
                </div>

                <button className=" mx-3 my-5 btn btn-dark">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUsers;
