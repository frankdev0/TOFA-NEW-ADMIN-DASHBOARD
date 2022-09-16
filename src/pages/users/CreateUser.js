import React, { useState } from "react";
import cherry from "../../assets/cherry.png";
import "./user.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";

const CreateUsers = () => {
  const [file, setFile] = useState("");
  // const [info, setInfo] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/add-employee", {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      });
      // setInfo(data.data.response);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <div className="single">
            <div className="row">
              <div style={{ textAlign: "left" }} className="my-5 col-6">
                <h1>Add User</h1>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <buttonn className="btn btn-dark" onClick={() => navigate(-1)}>
                  Back
                </buttonn>
              </div>
            </div>

            <form className="" onSubmit={handleSubmit}>
              <div className="row">
                <div className=" col-6 inputFields">
                  {/* <div className="my-2">
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
                  </div> */}
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

                  <label className="lab">Phone Number</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                  <label className="la">Role</label>
                  <select
                    className="form-control bg-light"
                    onChange={handleChange}
                    name="role"
                  >
                    {" "}
                    <option>....Please Select a Role</option>
                    <option>BUYER</option>
                    <option>FINANCE</option>
                    <option>SOURCE_PRO_AGENT</option>
                    <option>SOURCE_PRO_ADMIN</option>
                    <option>WEBSITE_ADMIN</option>
                    <option>SUPER_ADMIN</option>
                  </select>
                </div>

                <div className="col-6">
                  {/* <img
                    src={file ? URL.createObjectURL(file) : cherry}
                    alt="product pic"
                    className="left"
                  /> */}
                </div>

                <button className=" mx-3 my-5 btn btn-dark " type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUsers;
