import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { dark } from "@mui/material/styles/createPalette";
import { Protectedd } from "../../../utils/Protectedd";

const CreateTraction = () => {
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [traction, setTraction] = useState({
    name: "",
    count: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTraction({ ...traction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data: result } = await axios.post("/traction ", {
        name: traction.name,
        count: traction.count,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        navigate(-1);
      }, 2500);
      toast.success("SUCCESSFULLY CREATED TRACTION", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
        className: dark,
      });
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
    // if (!formErrors.question || !formErrors.answer) {
    // navigate("/faq")
    // } else {
    //   toast.error("FILL IN THE FIELDS"), {
    //     position: "top-right",
    //     autoClose: 8000,
    //     pauseHover: true,
    //     draggable: true,
    //     className: dark,
    //   }
    // }
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
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header">
                    <h2 className="pageheader-title">Traction</h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Edit Traction</h5>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Traction Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.question && (
                            <p className="text-danger">{formErrors.name}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="count">Traction Count</label>
                          <input
                            className="form-control"
                            type="number"
                            name="count"
                            onChange={handleChange}
                          />
                          {formErrors.answer && (
                            <p className="text-danger">{formErrors.count}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <a
                            href="comingsoon"
                            className="btn btn-dark"
                            onClick={handleSubmit}
                          >
                            Save Traction
                          </a>
                        </div>
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

export default Protectedd(CreateTraction, ["WEBSITE_ADMIN", "SUPER_ADMIN"]);
