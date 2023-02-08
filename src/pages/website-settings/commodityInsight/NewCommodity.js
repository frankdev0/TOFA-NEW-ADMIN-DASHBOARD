import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { africanCountryData } from "../../buyershub/products/africanCountries";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Protectedd } from "../../../utils/Protectedd";

const NewCommodity = () => {
  const editorRef = useRef();
  const [commodity, setCommodity] = useState({
    name: "",
  });
  const [briefHistory, setBriefHistory] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([{ countryName: "" }]);

  // const handleEditor = () => {
  //   setBriefHistory(editorRef.current.getContent());
  // };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCommodity({ ...commodity, [e.target.name]: e.target.value });
  };

  const getCountry = () => {
    const countries = document.getElementsByClassName("country-keys");

    const country = [];
    for (let i = 0; i < countries.length; i++) {
      const [shortName, countryName] = countries[i].value.split("___");
      if (shortName && countryName) country.push({ shortName, countryName });
    }
    return JSON.stringify(country);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const jsonData = {
        name: commodity.name,
        countries: getCountry(),
        briefHistory: briefHistory,
      };
      console.log("NewCommodity", briefHistory);
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      formData.append("image", e.target.image.files[0]);
      console.log(e.target.image.files[0]);
      const { data: result } = await axios.post("/commodity", jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("SUCCESSFULLY CREATED NEW COMMODITY", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
      console.log(result);
    } catch (err) {
      setLoading(false);
      if (err.response.data.errors[0].field) {
        console.log(err.response.data.errors);
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

  const handleAddCountry = () => {
    setCountry([...country, { countryName: "" }]);
  };

  const handleRemoveCountry = (index) => {
    const countryValues = [...country];
    if (countryValues.length > 1) {
      countryValues.splice(index, 1);
      setCountry(countryValues);
    }
  };

  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar />

        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            <ToastContainer />
            <form className="px-3 my-5" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <h3 className="headder"> Create Commodity Insight</h3>

                <div>
                  <i
                    className="fa fa-arrow-left"
                    style={{ fontSize: "1.25rem" }}
                    aria-hidden="true"
                    onClick={() => navigate(-1)}
                  ></i>
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-2">
                  <label className="form-label">Commodity Name:</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <p className="text-danger">{formErrors.name}</p>
                  )}
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <label className="form-label">Country</label>
                  {country.map((info, index) => (
                    <div key={index} className="root my-2">
                      <select
                        value={country.countryName}
                        name="countries"
                        className="mx-1 form-control country-keys"
                      >
                        {Object.entries(africanCountryData).map(
                          (country, index) => {
                            return (
                              <option
                                key={index}
                                value={`${country[0]}___${country[1]}`}
                              >
                                {country[1]}
                              </option>
                            );
                          }
                        )}
                      </select>

                      <div className="d-flex align-items-center">
                        <i
                          className="fa-solid fa-plus mx-1 "
                          onClick={() => handleAddCountry()}
                        ></i>
                        <i
                          className="fa-solid fa-minus mx-1"
                          onClick={() => handleRemoveCountry(index)}
                        ></i>
                        {formErrors.country && (
                          <p className="text-danger">{formErrors.country}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {formErrors.country && (
                    <p className="text-danger">{formErrors.country}</p>
                  )}
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <h4>Commodity Information</h4>
                {/* <Editor
                  id="mytextarea"
                  name="briefHistory"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onChange={handleEditor}
                  init={{
                    forced_root_block: " ",
                  }}
                /> */}

                <JoditEditor
                  name="briefHistory"
                  ref={editorRef}
                  value={briefHistory}
                  tabIndex={1}
                  onChange={(newContent) => setBriefHistory(newContent)}
                />
                {formErrors.briefHistory && (
                  <p className="text-danger">{formErrors.briefHistory}</p>
                )}
              </div>

              <div className="mb-3" style={{ textAlign: "left" }}>
                {/* { file && <div>
               
            <img alt="not found" width={"250px"} src={URL.createObjectURL(file)} />
            </div>
          } */}
                <label className="form-label  my-2" htmlFor="firstimg">
                  <i
                    className="fa fa-cloud-upload img-upload"
                    aria-hidden="true"
                    style={{ fontSize: "55px", cursor: "pointer" }}
                  ></i>
                </label>
                <input
                  type="file"
                  id="firstimg"
                  name="image"
                  accept="image/*"
                  style={{ display: "none", vsisibility: "none" }}
                />
              </div>

              <div style={{ textAlign: "start" }}>
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
                  <button className="btn btn-dark px-5 py-2">Submit</button>
                )}
              </div>
            </form>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
      {/* <!-- end main wrapper --> */}
    </>
  );
};

export default Protectedd(NewCommodity, [
  "SUPER_ADMIN",
  "SOURCE_PRO_ADMIN",
  "FINANCE",
]);
