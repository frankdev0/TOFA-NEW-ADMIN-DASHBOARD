import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import dayjs from "dayjs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Protectedd } from "../../../utils/Protectedd";

const Banners = () => {
  const [banner, setBanner] = useState([]);
  const [viewBanner, setViewBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios
        .get(
          "http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com:8081/api/v2/banner"
        )
        .then((response) => {
          console.log(response.data.data);
          setBanner(response.data.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (bannerID) => {
    axios
      .delete(
        `http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com:8081/api/v2/banners/${bannerID}`
      )
      .then(() => {
        getData();
      });
  };

  const submit = (bannerID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(bannerID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const showDetails = (bannerID) => {
    setViewLoader(true);
    axios.get(`/banner/${bannerID}`).then((response) => {
      setViewBanner(response.data.data);
      console.log(response.data.data);
      setViewLoader(false);
    });
  };

  if (loading) {
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
                          <th scope="col">Section</th>
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
                                <img
                                  src={item.image}
                                  alt="banner"
                                  style={{ width: "100px", height: "100px" }}
                                />
                              </td>
                              <td>{item.callToAction}</td>
                              <td>{item.link}</td>
                              <td>{item.section}</td>

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
                                        onClick={(e) => showDetails(item.id)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        View
                                      </div>
                                    </li>
                                    <li>
                                      <Link to={`/editbanner/${item.id}`}>
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
                                  className="modal fade"
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
                                          {dayjs(viewBanner.createdAt).format(
                                            "D MMMM YYYY"
                                          )}
                                          {/* {dayjs.map((item) => {
                                          return item.viewBanner.createdAt;
                                        })} */}
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

export default Protectedd(Banners, ["WEBSITE_ADMIN", "SUPER_ADMIN"]);
