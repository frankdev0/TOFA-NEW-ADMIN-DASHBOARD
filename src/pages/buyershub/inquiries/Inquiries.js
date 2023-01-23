import React, { useEffect, useState } from "react";
// import { useFetch } from '../../../useFetch'
import { axios } from "../../components/baseUrl";
import { applicantDatatabless } from "./DummyData";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./inquiries.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [inquiryView, setInquiryView] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const getData = async () => {
    try {
      axios.get("/rfq/all").then((response) => {
        console.log(response.data);
        setInquiries(response.data.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  //  const {data, loading, error} = useFetch("/order")

  //  if (loading) return <h1>LOADING ....</h1>

  //  if (error) console.log(error)

  const showDetails = (productID) => {
    setViewLoader(true);
    axios.get(`/rfq/${productID}`).then((response) => {
      setInquiryView(response.data.data);
      setViewLoader(false);
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
                  <h2 className="pageheader-title">INQUIRIES</h2>
                </div>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">Inquiries</h5>
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
                              <th>productName</th>
                              <th>Name</th>
                              <th>email</th>
                              <th>Country</th>
                              <th>paymentTerms</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiries.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.productName}</td>
                                  <td>{item.buyer && item.buyer.fullName}</td>
                                  <td>{item.buyer && item.buyer.email}</td>
                                  <td>{item.destinationPort}</td>
                                  <td>{item.paymentTerms}</td>

                                  <td>
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
                                                Buyer Enquiry Management
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close text-danger"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div className="modal-wrapper">
                                              <div className="d-flex ">
                                                <div className="d-flex viewmodal-body px-2">
                                                  <div>Full Name:</div>
                                                  <br />
                                                  <div>
                                                    {" "}
                                                    {inquiryView.buyer &&
                                                      inquiryView.buyer
                                                        .fullName}
                                                  </div>
                                                </div>
                                                <div className=" d-flex viewmodal-body px-2">
                                                  <div>Email: </div>
                                                  <div>
                                                    {inquiryView.buyer &&
                                                      inquiryView.buyer.email}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="d-flex ">
                                                <div className="d-flex viewmodal-body px-2">
                                                  <div>
                                                    Product Name:
                                                    {inquiryView.ProductName}
                                                  </div>
                                                  <br />
                                                  <div> Cashew</div>
                                                </div>
                                                <div className="viewmodal-body px-2">
                                                  <label>Payment Terms: </label>
                                                  <p>
                                                    {inquiryView.paymentTerms}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="d-flex">
                                                <div className="d-flex viewmodal-body px-2">
                                                  <div>Terms Of Trade: </div>
                                                  <div>
                                                    {inquiryView.termsOfTrade}
                                                  </div>
                                                </div>

                                                <div className="d-flex viewmodal-body px-2">
                                                  <div>Destination Port: </div>
                                                  <div>
                                                    {
                                                      inquiryView.destinationPort
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="d-flex">
                                                <div className="d-flex viewmodal-body px-2">
                                                  <div>Quantity Requested:</div>
                                                  <div>
                                                    {
                                                      inquiryView.quantityRequired
                                                    }
                                                  </div>
                                                </div>
                                                <div className="viewmodal-body px-2">
                                                  <label>Target Price:</label>
                                                  <p>
                                                    {inquiryView.targetPrice}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="d-flex">
                                                <div className="viewmodal-body px-2">
                                                  <label>Units:</label>
                                                  <p> {inquiryView.unit}</p>
                                                </div>
                                                <div className="viewmodal-body px-2">
                                                  <label>
                                                    Product Specification:
                                                  </label>
                                                  <p>
                                                    {
                                                      inquiryView.productDescription
                                                    }
                                                  </p>
                                                  <p>
                                                    Commodo eget a et dignissim
                                                    dignissim morbi vitae, mi.
                                                    Mi aliquam sit ultrices enim
                                                    cursus. Leo sapien, pretium
                                                    duis est eu volutpat
                                                    interdum eu non. Odio eget
                                                    nullam elit laoreet. Libero
                                                    at felis nam at orci
                                                    venenatis rutrum nunc. Etiam
                                                    mattis ornare pellentesque
                                                    iaculis enim. Felis eu non
                                                    in aliquam egestas placerat.
                                                    Eget maecenas ornare
                                                    venenatis lacus nunc{" "}
                                                  </p>
                                                </div>
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
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Inquiries;
