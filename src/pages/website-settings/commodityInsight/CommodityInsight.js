import React, { useEffect, useState } from "react";
// import  { useReactToPrint } from 'react-to-print';
// import { useFetch } from "../../../useFetch";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import { datatabless } from "./DummyData";
import { Link } from "react-router-dom";
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { axios } from "../../components/baseUrl";

const CommodityInsight = () => {
  const [commodity, setCommodity] = useState([]);
  const [viewCommodity, setViewCommodity] = useState([]);

  const getData = async () => {
    try {
      axios.get("/commodity").then((response) => {
        console.log(response.data.data);
        setCommodity(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  // const setData = (id, country, name, briefHistory) => {
  //   localStorage.setItem("commodityID", id);
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("briefHistory", briefHistory);
  //   localStorage.setItem("country", country);
  // };

  useEffect(() => {
    getData();
  }, []);

  // const handleDelete = (commodityID) => {
  //   axios.delete(`/commodity/${commodityID}`).then((response) => {
  //    getData()
  //   });
  // };

  const showDetails = (commodityID) => {
    axios.get(`/commodity/${commodityID}`).then((response) => {
      setViewCommodity(response.data.data);
      console.log(response.data.data);
    });
  };

  // const updateHandler = (commodityID) => {
  //   axios.patch(`/commodity/${commodityID}`).then((response) => {
  //     setViewCommodity(response.data.data);
  //   });
  // };

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 1000);
    });
  }, []);

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
                    <div className="card-header" style={{ textAlign: "left" }}>
                      <h5 className="mb-0">
                        Data Tables - Print, Excel, CSV, PDF Buttons
                      </h5>
                      <p>
                        This example shows DataTables and the Buttons extension
                        being used with the Bootstrap 4 framework providing the
                        styling.
                      </p>
                    </div>
                    <div className="d-flex mx-2">
                      {/* <button className="mx-2">Excel</button> */}
                      <button>Copy</button>
                      <button className="mx-2">PDF</button>
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Excel"
                      />
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
                                <th>Name</th>
                                <th>briefHistory</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {commodity.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.briefHistory}</td>

                                    <td>
                                      <Link to={`/editcommodity/${item.id}`}>
                                        <button type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal">Edit</button>
                                      </Link>
                                      
                                       
                                    
                                      {/* <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        delete
                                      </button> */}
                                      |
                                      <button
                                        onClick={(e) => showDetails(item.id)}
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        view{" "}
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
                                                Product Information
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div align="right">
                                              {/* <Link to="/editcommodity">
                                                <button
                                                  className="btn btn-success"
                                                  onClick={() =>
                                                    setData(
                                                      item.id,
                                                      item.name,
                                                      item.briefHistory,
                                                      item.country
                                                    )
                                                  }
                                                >
                                                  Edit
                                                </button>
                                              </Link> */}
                                            </div>
                                            <div className="d-flex ">
                                              <div className="modal-body">
                                                Commodity Name:{" "}
                                                {viewCommodity.name}
                                              </div>
                                              <div className="modal-body">
                                                Country: {viewCommodity.country}
                                              </div>
                                            </div>
                                            <div className="d-flex">
                                              <div className="modal-body">
                                                brief History:{" "}
                                                {viewCommodity.briefHistory}
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
                    Copyright © 2018 Concept. All rights reserved. Dashboard by{" "}
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

export default CommodityInsight;
