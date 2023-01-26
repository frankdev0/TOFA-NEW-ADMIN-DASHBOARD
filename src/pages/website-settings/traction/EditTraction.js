import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";

import { useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Protectedd } from "../../../utils/Protectedd";

const EditTraction = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //   const [formErrors, setFormErrors] = useState({})
  //   const [customError, setCustomError] = useState("")

  const navigate = useNavigate();

  const { tractionId } = useParams();
  console.log(tractionId);

  const getInfo = async () => {
    try {
      const response = await axios.get(`/traction/${tractionId}`);
      //   setFaqInfo(response.data.data);
      console.log(response.data.data);
      setId(response.data.data.id);
      setName(response.data.data.name);
      setCount(response.data.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  //   const faqID =

  const handleUpdate = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data: result } = await axios.patch(`/traction/${id}`, {
        name,
        count,
      });
      setLoading(false);
      setTimeout(() => {
        navigate(-1);
      }, 2500);

      toast.success("EDITED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
      console.log(result);
      // navigate("/faq");
    } catch (error) {
      setLoading(false);
      if (error) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      }
    }
  };

  if (isLoading) {
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
        <div className="dashboard-main-wrapper">
          <Navbar />

          <Sidebar />

          <div className="dashboard-wrapper">
            <ToastContainer />
            <div className="container-fluid dashboard-content">
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header">
                    <h2 className="pageheader-title">
                      Frequently Asked Questions
                    </h2>
                  </div>
                </div>

                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <button className="btn btn-dark" onClick={() => navigate(-1)}>
                    Back
                  </button>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Edit FAQ</h5>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Question
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {/* {formErrors.question && (<p className="text-danger">{formErrors.question}</p>)} */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            Count
                          </label>
                          <textarea
                            className="form-control"
                            type="number"
                            value={count}
                            name="count"
                            onChange={(e) => setCount(e.target.value)}
                          />
                          {/* {formErrors.answer && (<p className="text-danger">{formErrors.answer}</p>)} */}
                        </div>

                        {loading ? (
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block px-5"
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-dark"
                            onClick={handleUpdate}
                          >
                            Update Traction
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end main wrapper --> */}
        </div>
        {/* <!-- end main wrapper --> */}
      </>
    </div>
  );
};

export default Protectedd(EditTraction, ["WEBSITE_ADMIN", "SUPER_ADMIN"]);
