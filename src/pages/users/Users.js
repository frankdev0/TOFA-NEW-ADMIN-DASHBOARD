import React, { useEffect, useState } from "react";
// import { useFetch } from '../../../useFetch'
import { axios } from "../components/baseUrl";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Users = () => {
  const [buyer, setBuyer] = useState([]);
  const [viewBuyer, setViewBuyer] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios.get("/auth/employees").then((response) => {
        console.log(response.data);
        setBuyer(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  const showDetails = (employeeID) => {
    axios.get(`/auth/employees/${employeeID}`).then((response) => {
      setViewBuyer(response.data.data);
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
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={(e) => showDetails(item.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      view
                                    </button>

                                    <div
                                      className="modal fade"
                                      id="exampleModal"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Buyers Information
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            {viewBuyer.fullName}
                                          </div>
                                          <div className="modal-body">
                                            {viewBuyer.email}
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-primary"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
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

export default Users;
