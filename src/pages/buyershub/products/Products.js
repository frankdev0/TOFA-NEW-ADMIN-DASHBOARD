import React, { useEffect, useState } from "react";
import { axios } from "../../components/baseUrl";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./products.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Protectedd } from "../../../utils/Protectedd";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [viewProduct, setViewProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios.get("/product").then((response) => {
        console.log(response.data);
        setProduct(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getData();
  }, []);

  const submit = (productID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => handleDelete(productID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleDelete = (productID) => {
    axios.delete(`/product/${productID}`).then((response) => {
      setViewProduct(response.data.data);
    });
  };

  const showDetails = (productID) => {
    setViewLoader(true);
    axios.get(`/product/${productID}`).then((response) => {
      setViewProduct(response.data.data);
      console.log(response.data.data);
      setViewLoader(false);
    });
  };

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
                  <h2 className="pageheader-title">Product Overview</h2>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createproduct" className="btn btn-dark">
                  Create Products
                </a>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">All Orders</h5>

                    {/* <p>This example shows DataTables and the Buttons extension being used with the Bootstrap 4 framework providing the styling.</p> */}
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
                              {/* <th>ID</th> */}
                              <th>Product ID</th>

                              <th>Product Name</th>
                              <th>Min Price Per Unit</th>
                              <th>maxPricePerUnit</th>

                              <th>supplyCapacity</th>

                              <th>minDuration</th>
                              <th>maxDuration</th>

                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  {/* <td>{item.id}</td> */}
                                  <td>{index + 1}</td>
                                  <td>{item.productName}</td>
                                  <td>
                                    {numberWithCommas(item.minPricePerUnit)}
                                  </td>
                                  <td>
                                    {numberWithCommas(item.maxPricePerUnit)}
                                  </td>

                                  <td>
                                    {numberWithCommas(item.supplyCapacity)}
                                  </td>
                                  <td>{item.minDuration}</td>
                                  <td>{item.maxDuration}</td>

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
                                          <Link to={`/editproduct/${item.id}`}>
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
                                        <div className="modal-dialog modal-xl">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h3
                                                className="modal-title"
                                                id="exampleModalLabel"
                                              >
                                                Product Details Management
                                              </h3>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div className="modal-body">
                                              <div
                                                className="d-flex top-ctn"
                                                style={{ width: "100%" }}
                                              >
                                                <div
                                                  className="top-left-ctn modal-body"
                                                  style={{ width: "50%" }}
                                                >
                                                  <h4>
                                                    Featured Product Image:{" "}
                                                  </h4>
                                                  <div
                                                    className="product-img-ctn"
                                                    style={{ width: "100%" }}
                                                  >
                                                    <div
                                                      className="product-img-ctn-featured"
                                                      style={{ width: "100%" }}
                                                    >
                                                      <img
                                                        src={
                                                          viewProduct.productImages &&
                                                          viewProduct.productImages.filter(
                                                            (image) =>
                                                              image.isMain ==
                                                              true
                                                          )[0].image
                                                        }
                                                        alt=""
                                                        style={{
                                                          width: "100%",
                                                          height: "auto",
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      className="product-img-ctn-other"
                                                      style={{ width: "100%" }}
                                                    >
                                                      {viewProduct.productImages &&
                                                        viewProduct.productImages
                                                          .filter(
                                                            (image) =>
                                                              image.isMain ==
                                                              false
                                                          )
                                                          .map(
                                                            (image, index) => (
                                                              <img
                                                                key={index}
                                                                src={
                                                                  image.image
                                                                }
                                                                alt=""
                                                                style={{
                                                                  width:
                                                                    "100px",
                                                                  height:
                                                                    "100px",
                                                                  margin: "5px",
                                                                  objectFit:
                                                                    "cover",
                                                                }}
                                                              />
                                                            )
                                                          )}
                                                    </div>
                                                  </div>
                                                  <Link
                                                    to={`/editproduct/${item.id}`}
                                                  >
                                                    <h5
                                                      style={{
                                                        color: "#DC4D04",
                                                      }}
                                                    >
                                                      Update images
                                                    </h5>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="top-right-ctn modal-body"
                                                  style={{ width: "50%" }}
                                                >
                                                  <h4> Product Details</h4>
                                                  <div
                                                    className="top-right-ctn-body"
                                                    style={{
                                                      width: "100%",
                                                      border:
                                                        "1px solid #000000",
                                                    }}
                                                  >
                                                    <div
                                                      className="top-right-ctn-body top-cont d-flex"
                                                      style={{ width: "100%" }}
                                                    >
                                                      <div
                                                        className="top-right-ctn-body top-cont-left"
                                                        style={{
                                                          width: "50%",
                                                          border:
                                                            "1px solid #DDDDDD",
                                                        }}
                                                      >
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Product Name:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.productName
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Subcategory:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.subCategory
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Max Lead Time:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.maxDuration
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Unit:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.unitForMinOrder
                                                          }
                                                        </div>
                                                      </div>
                                                      <div
                                                        className="top-right-ctn-body top-cont-right"
                                                        style={{
                                                          width: "50%",
                                                          border:
                                                            "1px solid #DDDDDD",
                                                        }}
                                                      >
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Supply Capacity:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.supplyCapacity
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Category:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.parentCategory
                                                          }
                                                        </div>

                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Min Duration:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.minDuration
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          <h6
                                                            style={{
                                                              color:
                                                                "rgba(0, 0, 0, 0.62)",
                                                            }}
                                                          >
                                                            {" "}
                                                            Min price:{" "}
                                                          </h6>
                                                          {
                                                            viewProduct.minPricePerUnit
                                                          }
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="top-right-ctn-body bottom-cont">
                                                      <h6
                                                        className="modal-body"
                                                        style={{
                                                          color:
                                                            "rgba(0, 0, 0, 0.62)",
                                                        }}
                                                      >
                                                        {" "}
                                                        Country Traded and
                                                        Price:{" "}
                                                        {viewProduct.CountryTraded &&
                                                          viewProduct.CountryTraded.map(
                                                            (productInfo) => {
                                                              return (
                                                                <div
                                                                  className="d-flex my-2"
                                                                  key={
                                                                    productInfo.id
                                                                  }
                                                                >
                                                                  <span>
                                                                    {
                                                                      productInfo.countryName
                                                                    }
                                                                    :
                                                                  </span>
                                                                  <span className="mx-3">
                                                                    {
                                                                      productInfo.price
                                                                    }
                                                                  </span>
                                                                </div>
                                                              );
                                                            }
                                                          )}
                                                      </h6>
                                                      <div className="d-flex">
                                                        <div className="modal-body">
                                                          Maximum Price Per
                                                          Unit: <br />
                                                          {
                                                            viewProduct.maxPricePerUnit
                                                          }
                                                        </div>
                                                        <div className="modal-body">
                                                          Minimum Price Per
                                                          Unit: <br />
                                                          {
                                                            viewProduct.minPricePerUnit
                                                          }
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <Link
                                                    to={`/editproduct/${viewProduct.id}`}
                                                  >
                                                    <h5
                                                      style={{
                                                        color: "#DC4D04",
                                                      }}
                                                    >
                                                      Update product details
                                                    </h5>
                                                  </Link>
                                                </div>
                                              </div>
                                              <div className="bottom-ctn modal-body">
                                                <h4>Product Information</h4>
                                                <div
                                                  className="modal-body"
                                                  style={{
                                                    border: "1px solid #000000",
                                                  }}
                                                >
                                                  {
                                                    viewProduct.productDescription
                                                  }
                                                </div>
                                                <Link
                                                  to={`/editproduct/${viewProduct.id}`}
                                                >
                                                  <h5
                                                    style={{ color: "#DC4D04" }}
                                                  >
                                                    Update product information
                                                  </h5>
                                                </Link>
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

export default Protectedd(Products, ["SUPER_ADMIN", "SOURCE_PRO_ADMIN"]);
