import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../components/baseUrl";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Protectedd } from "../../../utils/Protectedd";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [viewTestimonial, setViewTestimonial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axiosInstance.get("/testimonial").then((response) => {
        setTestimonial(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (testimonialID) => {
    axiosInstance.delete(`/testimonial/${testimonialID}`).then(() => {
      getData();
    });
  };

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 1500);
    });
  }, []);

  const submit = (testimonialID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(testimonialID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const showDetails = (testimonialID) => {
    setViewLoader(true);
    axiosInstance.get(`/testimonial/${testimonialID}`).then((response) => {
      setViewTestimonial(response.data.data);
      setViewLoader(false);
    });
  };

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
        {/* <!-- navbar --> */}
        <Navbar />

        {/* <!-- left sidebar --> */}
        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            {/* <!-- pageheader --> */}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="page-header" style={{ textAlign: "left" }}>
                  <h2 className="pageheader-title">Testimonials</h2>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createtestimonial" className="btn btn-dark">
                  New Testimonial
                </a>
              </div>
            </div>
            {/* <!-- end pageheader --> */}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <h5
                    className="card-header font-bold"
                    style={{ textAlign: "left" }}
                  >
                    All Testimonial
                  </h5>
                  <div className="card-body">
                    <div className="table-responsive">
                      <div className="container">
                        <table
                          id="example"
                          className="table table-hover table-bordered"
                          style={{ width: "100%", textAlign: "left" }}
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Company</th>
                              <th>Message</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testimonial.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.company}</td>
                                  <td>{item.message}</td>

                                  <td className="action-table">
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
                                            to={`/edittestimonial/${item.id}`}
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
                                                TESTIMONIAL
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>

                                            <div className="modal-body">
                                              <p>
                                                Name: {viewTestimonial.name}
                                              </p>
                                              <p>
                                                Company:{" "}
                                                {viewTestimonial.company}
                                              </p>
                                              <p>
                                                Message:{" "}
                                                {viewTestimonial.message}
                                              </p>
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
  );
};

export default Protectedd(Testimonial, ["WEBSITE_ADMIN", "SUPER_ADMIN"]);
