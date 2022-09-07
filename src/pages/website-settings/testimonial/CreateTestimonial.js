import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
// import { useNavigate} from 'react-router-dom';

const CreateTestimonial = () => {
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [testimonial, setTestimonial] = useState({
    name: "",
    company: "",
    message: "",
  });

  // const navigate = useNavigate()

  const handleChange = (e) => {
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data: result } = await axios.post("/testimonial", {
        name: testimonial.name,
        company: testimonial.company,
        message: testimonial.message,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("SUCCESSFULLY CREATED FAQ", {
        position: "top-right",
        autoClose: 8000,
        pauseHover: true,
        draggable: true,
        className: "custom-toast",
      })
      console.log(result);
    } catch (err) {
      if (err.response.data.errors[0].field) {
        setFormErrors(
          err.response.data.errors.reduce(function(obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
      } else {
        console.log(err.response.data.errors[0].message);
        setCustomError(err.response.data.errors[0].message);
        alert(customError);
      }
    }
  };

  return (
    <div>
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
            <ToastContainer />
              {/* <!-- pageheader --> */}
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header" style={{ textAlign: "left" }}>
                    <h2 className="pageheader-title">Testimonial</h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header font-bold">
                      Create Testimonial
                    </h5>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Name
                          </label>
                          <input
                            id="inputText3"
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.name && (
                            <p className="text-danger">{formErrors.name}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Company
                          </label>
                          <input
                            id="inputText3"
                            name="company"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.company && (
                            <p className="text-danger">{formErrors.company}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            Message
                          </label>
                          <textarea
                            className="form-control"
                            name="message"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={handleChange}
                          />
                          {formErrors.message && (
                            <p className="text-danger">{formErrors.message}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <a
                            href="comingsoon"
                            className="btn btn-dark"
                            onClick={handleSubmit}
                          >
                            Save Testimonial
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CreateTestimonial;
