import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import * as dayjs from "dayjs";
const Banners = () => {
  const [banner, setBanner] = useState([]);
  const [viewBanner, setViewBanner] = useState([]);

  const getData = async () => {
    try {
      axios.get("/banner").then((response) => {
        console.log(response.data.data);
        setBanner(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleDelete = (bannerID) => {
  //   axios.delete(`/banners/${bannerID}`).then(() => {
  //     getData();
  //   });
  // };

  const showDetails = (bannerID) => {
    axios.get(`/banner/${bannerID}`).then((response) => {
      setViewBanner(response.data.data);
      console.log(response.data.data);
    });
  };

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
                  <h2 className="pageheader-title">Banner</h2>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createbanner" className="btn btn-dark">
                  Create New Banner
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
                    Banner
                  </h4>
                  <div className="card-body">
                    <table
                      className="table table-bordered"
                      style={{ textAlign: "left" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">S/N</th>
                          <th scope="col">Banner Image</th>
                          <th scope="col">Call to Action</th>
                          <th scope="col">Link</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banner.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {" "}
                                <img src={item.image} alt="banner" />
                              </td>
                              <td>{item.callToAction}</td>
                              <td>{item.link}</td>

                              <td>
                                <Link to={`/editbanner/${item.id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-success mx-2"
                                    data-dismiss="modal"
                                  >
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={(e) => showDetails(item.id)}
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  view{" "}
                                </button>
                                {/* <button
                                  className="btn btn-danger mx-2"
                                  onClick={(e) => handleDelete(item.id)}
                                >
                                  Delete
                                </button> */}
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
                                          Banner Information
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div align="right">{/* empty */}</div>

                                      <div className="modal-body">
                                        Uploaded on:{" "}
                                        {dayjs[viewBanner.createdAt]}
                                      </div>
                                      <div className="modal-body">
                                        Link: {viewBanner.link}
                                      </div>
                                      <div className="d-flex">
                                        <div className="modal-body">
                                          <img
                                            src={viewBanner.image}
                                            alt="banner"
                                            style={{
                                              width: "60%",
                                              height: "60%",
                                            }}
                                          />
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

          {/* <!-- footer --> */}
          {/* <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  */}
          {/* <!-- end footer --> */}
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Banners;
