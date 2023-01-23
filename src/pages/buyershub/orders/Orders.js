import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";
import { axios } from "../../components/baseUrl";
import dayjs from "dayjs";
import { Protectedd } from "../../../utils/Protectedd";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [viewLoader, setViewLoader] = useState(false);
  const [metrics, setMetrics] = useState({});
  const [paymentReceipt, setPaymentReceipt] = useState(null);

  const getOrders = async () => {
    try {
      axios.get("/order").then((response) => {
        console.log(response.data);
        setOrders(response.data.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.erros);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getPaymentReceipt = async (paymentReceiptID) => {
    try {
      await axios
        .get(`/order/image/receipt/${paymentReceiptID}`)
        .then((response) => {
          setPaymentReceipt(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (paymentReceiptID) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => deletePaymentReceipt(paymentReceiptID),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const deletePaymentReceipt = async (paymentReceiptID) => {
    try {
      await axios
        .delete(`order/image/receipt/${paymentReceiptID}`)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentReceipt();
  }, []);

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 2000);
    });
  }, []);

  const updateOrder = async (id) => {
    try {
      const { data } = await axios.patch("/order", {
        status: status,
        orderID: id,
      });
      setOrder(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("/admin/dashboard-metrics")
      .then((response) => {
        setMetrics(response.data.data);
        setMetricsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMetricsLoading(false);
      });
  }, []);

  // const handleCancel = () => {
  //   axios.patch("/order/cancel/{{orderID}}").then(() => {});
  // };

  useEffect(() => {}, [order]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const showDetails = async (orderID) => {
    try {
      setViewLoader(true);
      await axios.get(`/order/${orderID}`).then((response) => {
        setOrder(response.data.data);
        console.log(response.data.data);
        setViewLoader(false);
      });
      const paymentReceiptID = orderID;
      await axios
        .get(`/order/image/receipt/${paymentReceiptID}`)
        .then((response) => {
          setPaymentReceipt(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || metricsLoading) {
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
                  <h2 className="pageheader-title">Order Overview</h2>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/corders" className="btn btn-dark">
                  Create Order
                </a>
              </div>
            </div>
            {/* <!-- end pageheader --> */}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {/* <!-- widgets   --> */}
                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-inline-block">
                          <h5 className="text-muted">Total Orders</h5>
                          <h2 className="mb-0"> {metrics.totalOrders}</h2>
                        </div>
                        <div
                          className="float-right icon-circle-medium  icon-box-lg  bg-info-light mb-2"
                          style={{ textAlign: "center" }}
                        >
                          <i className="fa fa-eye fa-fw fa-sm text-info justify-content-center mt-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-inline-block">
                          <h5 className="text-muted">Transactions</h5>
                          <h2 className="mb-0">
                            {" "}
                            ${metrics.totalTransactions}
                          </h2>
                        </div>
                        <div
                          className="float-right icon-circle-medium  icon-box-lg  bg-brand-light mb-2"
                          style={{ textAlign: "center" }}
                        >
                          <i className="fa fa-money-bill-alt fa-fw fa-sm text-brand mt-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-inline-block">
                          <h5 className="text-muted">Total Buyers</h5>
                          <h2 className="mb-0"> {metrics.totalBuyers}</h2>
                        </div>
                        <div
                          className="float-right icon-circle-medium  icon-box-lg  bg-primary-light mb-2"
                          style={{ textAlign: "center" }}
                        >
                          <i className="fa fa-user fa-fw fa-sm text-primary mt-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-inline-block">
                          <h5 className="text-muted">Partnerships</h5>
                          <h2 className="mb-0">14</h2>
                        </div>
                        <div
                          className="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mb-2"
                          style={{ textAlign: "center" }}
                        >
                          <i className="fa fa-handshake fa-fw fa-sm text-secondary mt-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h4 className="mb-0 font-bold">All Orders</h4>

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
                              <th>ID</th>
                              <th>Cost</th>
                              <th>Country</th>
                              <th>IncoTerm</th>
                              <th>paymentTerm</th>
                              <th>ShippingType</th>
                              <th>Order Status</th>
                              {/* <th>Payment Status</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{numberWithCommas(item.cost)}</td>
                                  <td>{item.country}</td>
                                  <td>{item.incoterm}</td>

                                  <td>{item.paymentTerm}</td>
                                  <td>{item.shippingType}</td>
                                  <td>
                                    {item.status === "PENDING" && (
                                      <div className="text-warning rounded-pill text-center">
                                        PENDING
                                      </div>
                                    )}
                                    {item.status === "PROCESSING" && (
                                      <div className="text-primary rounded-pill text-center">
                                        CONFIRMED
                                      </div>
                                    )}
                                    {item.status === "SHIPPED" && (
                                      <div className="text-info rounded-pill text-center">
                                        SHIPPED
                                      </div>
                                    )}
                                    {item.status === "DELIVERED" && (
                                      <div className="text-success rounded-pill text-center">
                                        DELIVERED
                                      </div>
                                    )}
                                    {item.status === "CANCELLED" && (
                                      <div className="text-gray rounded-pill text-center">
                                        CANCELLED
                                      </div>
                                    )}
                                  </td>
                                  {/* <td>
                                    {item.status === "PENDING" ? (
                                      <div className="text-warning rounded-pill text-center mx-2">
                                        PENDING
                                      </div>
                                    ) : (
                                      <div className="text-success rounded-pill text-center mx-2">
                                        PAID
                                      </div>
                                    )}
                                  </td> */}

                                  <td>
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
                                              <h3
                                                className="order-modal-title"
                                                id="exampleModalLabel"
                                              >
                                                Order Details
                                              </h3>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div>
                                              <div
                                                className="middle-ctn d-flex mx-auto d-flex align-items-center"
                                                style={{
                                                  width: "80%",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <div className="viewmodal-body">
                                                  <h6
                                                    style={{
                                                      color:
                                                        "rgba(0, 0, 0, 0.62)",
                                                    }}
                                                  >
                                                    {" "}
                                                    Product name:{" "}
                                                  </h6>
                                                  <p>
                                                    {order.product &&
                                                      order.product.productName}
                                                  </p>
                                                  <h6
                                                    style={{
                                                      color:
                                                        "rgba(0, 0, 0, 0.62)",
                                                    }}
                                                  >
                                                    {" "}
                                                    Date of placed order:{" "}
                                                    <span>
                                                      {dayjs(
                                                        order.createdAt
                                                      ).format("D MMMM YYYY")}
                                                    </span>
                                                  </h6>
                                                </div>
                                                <div className="viewmodal-body">
                                                  <div>Payment Receipt</div>
                                                  <div className="receipt-container">
                                                    {/* <img src={paymentReceipt} alt='payment receipt'/> */}
                                                    <i
                                                      className="fa fa-file receipt"
                                                      aria-hidden="true"
                                                    ></i>
                                                    <div className="receipt-call-to-action">
                                                      <a
                                                        href="/"
                                                        className="action-font"
                                                      >
                                                        view
                                                      </a>
                                                      <div
                                                        className="action-font"
                                                        onClick={(e) =>
                                                          submit(item.id)
                                                        }
                                                      >
                                                        delete
                                                      </div>
                                                      <div className="action-font">
                                                        downlaod
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="viewmodal-body">
                                                  <h6
                                                    style={{
                                                      color:
                                                        "rgba(0, 0, 0, 0.62)",
                                                      width: "70%",
                                                    }}
                                                  >
                                                    {" "}
                                                    Select from dropdown to
                                                    update order status
                                                  </h6>
                                                  <select
                                                    style={{ width: "150px" }}
                                                    className="form-control"
                                                    onChange={
                                                      handleStatusChange
                                                    }
                                                    name="status"
                                                    aria-describedby="Default select example"
                                                    placeholder="select status"
                                                  >
                                                    <option>
                                                      {" "}
                                                      {order.status ===
                                                      "PENDING"
                                                        ? "...Select Status"
                                                        : order.status}
                                                    </option>
                                                    <option value="PENDING">
                                                      PENDING
                                                    </option>
                                                    <option value="PROCESSING">
                                                      CONFIRMED PAYMENT
                                                    </option>
                                                    <option value="SHIPPED">
                                                      ORDER SHIPPED
                                                    </option>
                                                    <option value="DELIVERED">
                                                      DELIVERED
                                                    </option>
                                                    <option value="CANCELLED">
                                                      CANCEL
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>

                                              <div className="my-2 middle-ctn d-flex mx-auto d-flex justify-content-center align-items-center">
                                                <div
                                                  className="middle-ctn-left"
                                                  style={{
                                                    border: "1px solid #DDDDDD",
                                                    width: "40%",
                                                  }}
                                                >
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Quantity:{" "}
                                                    </h6>
                                                    <p>
                                                      {order.quantityOrdered}
                                                    </p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Origin:{" "}
                                                    </h6>
                                                    <p>{order.country}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Incoterms:{" "}
                                                    </h6>
                                                    <p>{order.incoterm}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Shipping Type:{" "}
                                                    </h6>
                                                    <p>{order.shippingType}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Payment terms:{" "}
                                                    </h6>
                                                    <p>{order.paymentTerm}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Payment Status:{" "}
                                                    </h6>
                                                    <div
                                                      style={{
                                                        width: "100px",
                                                        textAlign: "left",
                                                      }}
                                                    >
                                                      {order.status ===
                                                        "PENDING" && (
                                                        <div className="bg-warning rounded-pill text-center">
                                                          PENDING
                                                        </div>
                                                      )}
                                                      {order.status ===
                                                        "PROCESSING" && (
                                                        <div className="bg-success rounded-pill text-center mx-2">
                                                          PAID
                                                        </div>
                                                      )}
                                                      {order.status ===
                                                        "SHIPPED" && (
                                                        <div className="bg-success rounded-pill text-center mx-2">
                                                          PAID
                                                        </div>
                                                      )}
                                                      {order.status ===
                                                        "DELIVERED" && (
                                                        <div className="bg-success rounded-pill text-center mx-2">
                                                          PAID
                                                        </div>
                                                      )}

                                                      {order.status ===
                                                        "CANCELLED" && (
                                                        <div className="bg-secondary rounded-pill text-center mx-2">
                                                          CANCELLED
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="middle-ctn-right"
                                                  style={{
                                                    border: "1px solid #DDDDDD",
                                                    width: "40%",
                                                  }}
                                                >
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Buyer's name:{" "}
                                                    </h6>
                                                    <p>
                                                      {order.buyer &&
                                                        order.buyer.fullName}
                                                    </p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Company:{" "}
                                                    </h6>
                                                    <p>{order.buyerID}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      Email:{" "}
                                                    </h6>
                                                    <p>
                                                      {order.buyer &&
                                                        order.buyer.email}
                                                    </p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Order Number:{" "}
                                                    </h6>
                                                    <p>{order.orderNumber}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Destination:{" "}
                                                    </h6>
                                                    <p>{order.port}</p>
                                                  </div>
                                                  <div className="viewmodal-body">
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgba(0, 0, 0, 0.62)",
                                                      }}
                                                    >
                                                      {" "}
                                                      Cost:{" "}
                                                    </h6>
                                                    <p>{order.cost}</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="bottom-ctn"></div>
                                            </div>

                                            <div className="modal-body px-2 order-note">
                                              <div>Note: </div>
                                              <p>{order.note}</p>
                                            </div>

                                            <div className="modal-footer">
                                              <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                  updateOrder(order.id)
                                                }
                                              >
                                                Update
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-secondary mx-3"
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
                  Copyright © 2023 Concept. All rights reserved
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end footer --> */}
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Protectedd(Orders, ["SUPER_ADMIN", "FINANCE"]);
