import React, { useEffect, useState } from "react";
import { axios } from "../../components/baseUrl";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [viewTestimonial, setViewTestimonial] = useState([]);

  const getData = async () => {
    try {
      axios.get("/testimonial").then((response) => {
        console.log(response.data.data);
        setTestimonial(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  // const handleDelete = (testimonialID) => {
  //   axios.delete(`/testimonial/${testimonialID}`).then(() => {
  //     getData();
  //   });
  // };

  const showDetails = (testimonialID) => {
    axios.get(`/testimonial/${testimonialID}`).then((response) => {
      setViewTestimonial(response.data.data);
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
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Company</th>
                          <th scope="col">Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonial.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index +1}</td>
                              <td>{item.name}</td>
                              <td>{item.company}</td>
                              <td>{item.message}</td>
                              <td className="text-center d-flex">
                                {/* <button className="btn btn-danger mx-2" onClick={(e) => handleDelete(item.id)}>
                                  Delete
                                </button> */}
                              
                                  <div className="text-center mx-2">
                                <Link to={`/edittestimonial/${item.id}`}>
                                        <button type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal">Edit</button>
                                      </Link>
                                      </div>
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
                                          TESTIMONIAL
                                        </h5>
                                      </div>
                                      <div className="modal-body">
                                        <p>{viewTestimonial.name}</p>
                                        <p>{viewTestimonial.company}</p>
                                        <p>{viewTestimonial.message}</p>
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

export default Testimonial;
