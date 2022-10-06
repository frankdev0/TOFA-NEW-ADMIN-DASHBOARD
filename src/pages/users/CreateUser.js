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
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState({});
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
    } catch (err) {
      if (err.response.data.errors[0].field) {
        console.log(err.response.data.errors);
        setFormErrors(
          err.response.data.errors.reduce(function(obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
      } else {
        console.log(err.response.data.errors[0].message);
        setCustomError();
        alert(customError);
      }
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
                <h1>Add Employee</h1>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <button
                  className="btn btn-dark px-4"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
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
                  {formErrors.fullName && (
                    <p className="text-danger">{formErrors.fullName}</p>
                  )}

                  <label className="la">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder=""
                    name="email"
                    onChange={handleChange}
                  />

                  {formErrors.email && (
                    <p className="text-danger">{formErrors.email}</p>
                  )}

                  <label className="lab">Phone Number</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-danger">{formErrors.phoneNumber}</p>
                  )}
                  <label className="la">Role</label>
                  <select
                    className="form-control bg-light"
                    onChange={handleChange}
                    name="role"
                  >
                    {" "}
                    <option>....Please Select a Role</option>
                    <option>SUPER_ADMIN</option>
                    <option>SOURCE_PRO_ADMIN</option>
                    <option>MARKETPLACE_ADMINN</option>
                    <option>FINANCE</option>
                    <option>WEBSITE_ADMIN</option>
                    <option>SOURCE_PRO_AGENT</option>
                  </select>
                  {formErrors.role && (
                    <p className="text-danger">{formErrors.role}</p>
                  )}
                </div>

                <div className="col-6">
                  <img
                    src={file && URL.createObjectURL(file)}
                    alt="product pic"
                    className="left"
                  />
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
