import React, { useEffect, useState } from "react";
// import  { useReactToPrint } from 'react-to-print';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { axios } from "../../components/baseUrl";
import { Link } from "react-router-dom";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Tractions = () => {
  const [traction, setTraction] = useState([]);
  const [viewTraction, setViewTraction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios.get("/traction").then((response) => {
        setTraction(response.data.data);
        console.log(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (tractionID) => {
    axios.delete(`/traction/${tractionID}`).then((response) => {
      getData();
    });
  };

  const submit = (tractionID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(tractionID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const showDetails = (tractionID) => {
    setViewLoader(true);
    axios.get(`/traction/${tractionID}`).then((response) => {
      setViewTraction(response.data.data);
      setViewLoader(false);

      console.log(response.data.data);
    });
  };

  useEffect(() => {}, [loading]);

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 2000);
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
    <div>
      <>
        {/* <!-- main wrapper --> */}
        <div className="dashboard-main-wrapper">
          {/* <!-- navbar --> */}
          <Navbar />
          {/* <!-- end navbar --> */}

          {/* <!-- left sidebar --> */}
          <Sidebar />
          {/* <!-- end left sidebar --> */}

          {/* <!-- wrapper  --> */}
          <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
              {/* <!-- pageheader --> */}
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header" style={{ textAlign: "left" }}>
                    <h2 className="pageheader-title">Traction</h2>
                  </div>
                </div>
                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/createtraction" className="btn btn-dark">
                    New Traction
                  </a>
                </div>
              </div>
              {/* <!-- end pageheader --> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h4
                      className="card-header font-bold"
                      style={{ textAlign: "left" }}
                    >
                      All Tractions
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div
                      className="card-body"
                      style={{ paddingLeft: "70px", paddingRight: "70px" }}
                    >
                      <div className="table-responsive">
                        <div className="container">
                          <table
                            id="example"
                            className="table table-hover table-bordered"
                            style={{ textAlign: "left" }}
                          >
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Traction Name</th>
                                <th>Counts</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {traction.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td width="40px">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>

                                    <td className="action-table" width="50px">
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
                                            <Link
                                              to={`/edittraction/${item.id}`}
                                            >
                                              <div className="dropdown-item">
                                                Edit
                                              </div>
                                            </Link>
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
                                                  Product Information
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                ></button>
                                              </div>
                                              <div align="right"></div>
                                              <div className="d-flex ">
                                                <div className="modal-body">
                                                  Traction Name:{" "}
                                                  {viewTraction.name}
                                                </div>
                                                <div className="modal-body">
                                                  Total Counts:
                                                  {viewTraction.count}
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
        </div>
      </>
    </div>
  );
};

export default Tractions;
