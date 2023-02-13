import React, { useEffect, useState } from "react";
// import { useFetch } from '../../../useFetch'
import { axiosInstance } from "../../components/baseUrl";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Protectedd } from "../../../utils/Protectedd";

const Disputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [viewDisputes, setViewDisputes] = useState({});
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axiosInstance.get("/dispute").then((response) => {
        console.log(response.data);
        setDisputes(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  const showDetails = (disputeID) => {
    setViewLoader(true);
    try {
      axiosInstance.get(`/dispute/${disputeID}`).then((response) => {
        console.log(response.data.data);
        setViewDisputes(response.data.data);
        setViewLoader(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getDispute = async (id) => {
    try {
      const { data } = await axiosInstance.patch("/dispute", {
        status: "RESOLVED",
        disputeID: id,
      });
      setViewDisputes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                  <h2 className="pageheader-title">DISPUTES</h2>
                </div>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">All Disputes</h5>
                  </div>
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
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Subject</th>
                              <th>Complaint</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {disputes.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.buyer.fullName}</td>
                                  <td>{item.buyer.email}</td>
                                  <td>
                                    {item.status === "PENDING" && (
                                      <div className="text-warning rounded-pill text-center">
                                        PENDING
                                      </div>
                                    )}
                                    {item.status === "RESOLVED" && (
                                      <div className="text-success rounded-pill text-center">
                                        RESOLVED
                                      </div>
                                    )}
                                  </td>
                                  <td>{item.subject}</td>
                                  <td>{item.complaint}</td>

                                  <td>
                                    {/* <button
                                      onClick={(e) => showDetails(item.id)}
                                      type="button"
                                      className="btn btn-primary" 
                                    >
                                      view
                                    </button> */}
                                    <div className="text-center">
                                      <button
                                        onClick={(e) => showDetails(item.id)}
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        view
                                      </button>
                                    </div>

                                    <div
                                      className="modal fade modal-width"
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
                                                TOFA Dispute Pipeline
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close text-danger"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>

                                            <div
                                              className="modal-body px-2 d-flex"
                                              style={{
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div className="">
                                                <label>Customer Name: </label>
                                                <br />
                                                <p>
                                                  {viewDisputes.buyer &&
                                                    viewDisputes.buyer.fullName}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="modal-body px-2">
                                              <label>Date: </label>
                                              <p>
                                                Tuesday, November 30, 2021
                                                2:00:19 PM
                                              </p>
                                            </div>

                                            <div className="modal-body px-2 d-flex">
                                              Dispute Status:
                                              <div
                                                className=""
                                                style={{
                                                  width: "75px",
                                                  height: "30px",
                                                }}
                                              >
                                                <p className="text-white  mx-1">
                                                  {viewDisputes.status ===
                                                  "PENDING" ? (
                                                    <span className="bg-danger rounded-pill text-center px-2 py-1">
                                                      Open
                                                    </span>
                                                  ) : (
                                                    <span className="bg-success rounded-pill text-center px-1 py-1 ">
                                                      Resolved
                                                    </span>
                                                  )}
                                                </p>
                                              </div>
                                            </div>

                                            <div className=" modal-bodyb px-2">
                                              <label>Subject:</label>
                                              <p>{viewDisputes.subject} </p>
                                            </div>
                                            <div className="modal-body px-2">
                                              <label>Complaint:</label>
                                              <p>{viewDisputes.complaint}</p>
                                            </div>

                                            <div className="modal-footer">
                                              <button
                                                type="button"
                                                className="btn btn-dark"
                                                style={{
                                                  background: "#4f4f4f",
                                                  borderRadius: "5px",
                                                }}
                                                onClick={(e) =>
                                                  getDispute(viewDisputes.id)
                                                }
                                              >
                                                Resolve
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

export default Protectedd(Disputes);
