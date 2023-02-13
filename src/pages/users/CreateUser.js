import React, { useState } from "react";
import "./user.css";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Protectedd } from "../../utils/Protectedd";

const CreateUsers = () => {
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState([]);
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
      const { data } = await axiosInstance.post("/auth/add-employee", {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("SUCCESSFULLY CREATED EMPLOYEE", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
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
        setCustomError(err.response.data.errors[0].message);
        if (err.response.data.errors[0].message) {
          toast.error("EMPLOYEE EMAIL ALREADY EXIST", {
            position: "top-right",
            autoClose: 4000,
            pauseHover: true,
            draggable: true,
          });
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper">
        <ToastContainer />
        <div className="container-fluid dashboard-content">
          <div className="single">
            <div className="row">
              <div style={{ textAlign: "left" }} className="my-3 col-6">
                <h1>Add Employee</h1>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <i
                  className="fa fa-arrow-left"
                  style={{ fontSize: "1.25rem" }}
                  aria-hidden="true"
                  onClick={() => navigate(-1)}
                ></i>
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
                  {/* <label className="l">Full Name</label> */}
                  <input
                    className="form-control user-input"
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                  />
                  {formErrors.fullName && (
                    <p className="text-danger">{formErrors.fullName}</p>
                  )}

                  {/* <label className="la">Email</label> */}
                  <div className="my-3">
                    <input
                      className="form-control user-input"
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  {formErrors.email && (
                    <p className="text-danger">{formErrors.email}</p>
                  )}

                  {/* <label className="lab">Phone Number</label> */}
                  <input
                    className="form-control user-input"
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-danger">{formErrors.phoneNumber}</p>
                  )}
                  <div className="my-3">
                    <select
                      className="form-control bg-light user-input"
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
                    {customError && (
                      <span className="text-danger my-3">{customError}</span>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  {/* <img
                    src={file && URL.createObjectURL(file)}
                    alt="product pic"
                    className="left"
                  /> */}
                </div>

                <button
                  className=" mx-3 my-3 btn btn-dark user-submit"
                  type="submit"
                  style={{ maxWidth: "150px" }}
                >
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

export default Protectedd(CreateUsers, ["SUPER_ADMIN"]);
