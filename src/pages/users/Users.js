import React, { useEffect, useState } from "react";
// import { useFetch } from '../../../useFetch'
import { axiosInstance } from "../components/baseUrl";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { Protectedd } from "../../utils/Protectedd";

const Users = () => {
  const [buyer, setBuyer] = useState([]);
  const [viewUser, setViewUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axiosInstance.get("/auth/employees").then((response) => {
        console.log(response.data);
        setBuyer(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  const handleDelete = (employeeID) => {
    axiosInstance.delete(`/auth/employees/${employeeID}`).then(() => {
      getData();
    });
  };

  const submit = (employeeID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(employeeID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const showDetails = (employeeID) => {
    setViewLoader(true);
    axiosInstance.get(`/auth/employees/${employeeID}`).then((response) => {
      setViewUser(response.data.data);
      setViewLoader(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 1500);
    });
  }, []);

  if (!loading) {
    return (
      <div
        className="spinner mx-auto"
        align="center"
        id="spinner"
        style={{
          position: "absolute",
          top: "calc(50% - 60px)",
          left: "calc(50% - 60px)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
      ></div>
    );
  }

  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar />
        <Sidebar />
        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            {/* <!-- pageheader --> */}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="page-header" style={{ textAlign: "left" }}>
                  <h2 className="pageheader-title">USERS</h2>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createuser" className="btn btn-dark">
                  Create User
                </a>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">All Users</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        id="example wrapper"
                        className="dataTables_wrapper dt_bootstrap4"
                      ></div>
                      <div className="container">
                        <table
                          id="example"
                          className="table table-hover table-bordered"
                          style={{ width: "100%", textAlign: "left" }}
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Full Name</th>
                              <th>Role</th>
                              <th>Email</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {buyer.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.fullName}</td>
                                  <td>{item.type}</td>
                                  <td>{item.email}</td>

                                  <td>
                                    <div className="nav-item dropdown">
                                      <Link
                                        className="nav-link main-nav-link position-absolute"
                                        align="right"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                          right: "-15px",
                                          top: "-10px",
                                          color: "black",
                                        }}
                                      >
                                        <i
                                          className="fa fa-chevron-down"
                                          align="right"
                                          aria-hidden="true"
                                        ></i>
                                      </Link>
                                      <ul
                                        className="dropdown-menu animate slideIn"
                                        aria-labelledby="navbarDropdown"
                                        style={{ width: "100px !important" }}
                                      >
                                        <li>
                                          <div
                                            className="dropdown-item"
                                            onClick={(e) =>
                                              showDetails(item.id)
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            View
                                          </div>
                                        </li>

                                        <li>
                                          <div
                                            className="dropdown-item text-danger"
                                            onClick={(e) => submit(item.id)}
                                          >
                                            Delete
                                          </div>
                                        </li>
                                      </ul>
                                    </div>

                                    <div
                                      className="modal fade p-relative"
                                      id="exampleModal"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      {viewLoader ? (
                                        <div
                                          className="spinner mx-auto"
                                          align="center"
                                          id="spinner"
                                          style={{
                                            position: "absolute",
                                            top: "calc(50% - 60px)",
                                            left: "calc(50% - 60px)",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            margin: "auto",
                                          }}
                                        ></div>
                                      ) : (
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5
                                                className="modal-title"
                                                id="exampleModalLabel"
                                              >
                                                USER
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>

                                            <div className="d-flex ">
                                              <div className="modal-body">
                                                Full Name: {viewUser.fullName}
                                              </div>
                                              <div className="modal-body">
                                                Email: {viewUser.email}
                                              </div>
                                            </div>
                                            <div className="d-flex ">
                                              <div className="modal-body">
                                                Phone Number:{" "}
                                                {viewUser.phoneNumber}
                                              </div>
                                              <div className="modal-body">
                                                Role: {viewUser.type}
                                              </div>
                                            </div>

                                            <div className="modal-footer">
                                              <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                              >
                                                Close
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Protectedd(Users, ["SUPER_ADMIN"]);
