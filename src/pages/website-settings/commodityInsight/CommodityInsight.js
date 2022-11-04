import React, { useEffect, useState } from "react";
// import  { useReactToPrint } from 'react-to-print';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { Link } from "react-router-dom";

import "jquery/dist/jquery.min.js";
import "./editor.css";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { axios } from "../../components/baseUrl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Protectedd } from "../../../utils/Protectedd";

const CommodityInsight = () => {
  const [commodity, setCommodity] = useState([]);
  const [viewCommodity, setViewCommodity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios.get("/commodity").then((response) => {
        setCommodity(response.data.data);
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

  const handleDelete = (commodityID) => {
    axios.delete(`/commodity/${commodityID}`).then((response) => {
      getData();
    });
  };

  const submit = (commodityID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(commodityID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const showDetails = (commodityID) => {
    setViewLoader(true);
    axios.get(`/commodity/${commodityID}`).then((response) => {
      setViewCommodity(response.data.data);
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
                    <h2 className="pageheader-title">Commodities</h2>
                  </div>
                </div>
                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/newcommodity" className="btn btn-dark">
                    New Commodity
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
                      All Commodities
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <div className="container px-5">
                          <table
                            id="example"
                            className="table table-hover table-bordered tableWidth"
                            style={{ textAlign: "left" }}
                          >
                            <thead>
                              <tr>
                                <th className="id">ID</th>
                                <th className="name">Name</th>
                                <th>BriefHistory</th>
                                <th className="action">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {commodity.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td className="indexWith">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                      <div
                                        className="briefHistory"
                                        dangerouslySetInnerHTML={{
                                          __html: item.briefHistory
                                            .split("&lt;")
                                            .join("<"),
                                        }}
                                      ></div>
                                    </td>

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
                                              to={`/editcommodity/${item.id}`}
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
                                          <div className="modal-dialog modal-lg">
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
                                                <div className="modal-body d-flex">
                                                  <span className="mx-1">
                                                    Commodity Name:
                                                  </span>{" "}
                                                  <h5>{viewCommodity.name}</h5>
                                                </div>
                                                <div className="modal-body d-flex">
                                                  Country Traded:
                                                  <span className="mx-2">
                                                    {" "}
                                                    {viewCommodity.countriesTraded &&
                                                      viewCommodity.countriesTraded.map(
                                                        (country, id) => {
                                                          return (
                                                            <div key={id}>
                                                              <div className="my-2">
                                                                <h5 className="country-name">
                                                                  {
                                                                    country.countryName
                                                                  }
                                                                </h5>
                                                              </div>
                                                            </div>
                                                          );
                                                        }
                                                      )}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="d-flex">
                                                <div
                                                  className="modal-body"
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      viewCommodity.briefHistory &&
                                                      viewCommodity.briefHistory
                                                        .split("&lt;")
                                                        .join("<"),
                                                  }}
                                                >
                                                  {/* Brief History:{" "}
                                                  {viewCommodity.briefHistory &&
                                                    renderHTML(
                                                      viewCommodity.briefHistory
                                                    )} */}
                                                </div>
                                              </div>

                                              <div className="modal-footer">
                                                <button
                                                  type="button"
                                                  className="btn btn-dark"
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

            {/* <!-- footer --> */}
            <div className="footer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    Copyright © 2018 Concept. All rights reserved. Dashboard by
                    <a href="https://colorlib.com/wp/">Colorlib</a>.
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="text-md-right footer-links d-none d-sm-block">
                      <a href="jav">About</a>
                      <a href="jav">Support</a>
                      <a href="jav">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end footer --> */}
          </div>
          {/* <!-- end main wrapper --> */}
        </div>
        {/* <!-- end main wrapper --> */}
      </>
    </div>
  );
};

export default Protectedd(CommodityInsight, [
  "SUPER_ADMIN",
  "SOURCE_PRO_ADMIN",
  "FINANCE",
]);
