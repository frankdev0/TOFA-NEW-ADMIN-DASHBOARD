import React, { useEffect, useState } from "react";
import { axios } from "../../components/baseUrl";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./faq.css";

const Faqs = () => {
  const [faq, setFaq] = useState([]);
  const [viewFaq, setViewFaq] = useState([]);

  const getData = async () => {
    try {
      axios.get("/faq").then((response) => {
        console.log(response.data);
        setFaq(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  // const setData = (id, question, answer) => {
  //   localStorage.setItem("faqID", id);
  //   localStorage.setItem("answer", answer);
  //   localStorage.setItem("question", question);
  // };

  useEffect(() => {
    getData();
  }, []);

  // const handleDelete = (faqID) => {
  //   axios.delete(`/faq/${faqID}`).then(() => {
  //     getData();
  //   });
  // };

  // const setID = (id) => {
  //   console.log(id)
  //   localStorage.setItem('ID', id)
  // }

  // const updateHandler = (faqID) => {
  //   axios.get(`/faq/${faqID}`).then((response) => {
  //     setViewFaq(response.data.data);
  //   });
  // };

  const showDetails = (faqID) => {
    axios.get(`/faq/${faqID}`).then((response) => {
      setViewFaq(response.data.data);
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
                  <h2 className="pageheader-title">
                    Frequently Asked Questions
                  </h2>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createfaq" className="btn btn-dark">
                  New FAQ
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
                    All FAQ's
                  </h5>
                  <div className="card-body">
                    <table
                      className="table table-bordered"
                      style={{ textAlign: "left" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Question</th>
                          <th scope="col">Answer</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faq.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index +1}</td>
                              <td>{item.question}</td>
                              <td>{item.answer}</td>
                              <td className="text-center d-flex">
                                <div className="text-center mx-2">
                              <Link to={`/editfaq/${item.id}`}>
                                        <button type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal">Edit</button>
                                      </Link>
                                      </div>
                                {/* <button className="btn btn-danger mx-2" onClick={(e) => handleDelete(item.id)}>
                                  Delete
                                </button> */}
                                <button
                                  onClick={() => showDetails(item.id)}
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  View
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
                                          FAQ
                                        </h5>

                                        {/* <Link to="/editfaq">
                                          <button
                                            className="btn btn-success"
                                            onClick={() =>
                                              setToLocalStorage(
                                                item.id,
                                                item.question,
                                                item.answer
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                        </Link> */}
                                      </div>

                                      <div className="modal-body">
                                        <p>{viewFaq.answer}</p>
                                        <p>{viewFaq.question}</p>
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

export default Faqs;
