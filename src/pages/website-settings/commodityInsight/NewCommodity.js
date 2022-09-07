import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { africanCountryData } from "../../buyershub/products/africanCountries";
import { toast, ToastContainer } from "react-toastify";

const NewCommodity = () => {
  const editorRef = useRef();
  const [commodity, setCommodity] = useState({
    name: "",
  });
  const [briefHistory, setBriefHistory] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [country, setCountry] = useState([{ countryName: "" }]);



  const handleEditor = () => {
    setBriefHistory(editorRef.current.getContent());
  };

  const handleChange = (e) => {
    setCommodity({ ...commodity, [e.target.name]: e.target.value });
  };

  const getCountry = () => {
    const countries = document.getElementsByClassName("country-keys");

    const country = [];
    for (let i = 0; i < countries.length; i++) {
      const [countryName, shortName] = countries[i].value.split("___");
      if (countryName && shortName) country.push({countryName, shortName});
    }
    return JSON.stringify(country);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const jsonData = {
        name: commodity.name,
        countries: getCountry(),
        briefHistory: briefHistory,
      };
      const formData = new FormData()
        for (const property in jsonData) {
          formData.append(`${property}`, jsonData[property]);
        }
        formData.append("image", e.target.image.files[0]);
        console.log(e.target.image.files[0])
      const { data: result } = await axios.post("/commodity", jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("SUCCESSFULLY CREATED NEW COMMODITY", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
      console.log(result);
    } catch (err) {
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
    countryValues.splice(index, 1);
    setCountry(countryValues);
  };

  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar />

        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div>
            <ToastContainer />
            <form className="mx-5 my-5" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <h2> Create Commodity Insight</h2>
                {/* <Link to="/commodityInsight">
                <button className="btn btn-primary m-3">Show Commodity</button>
              </Link> */}
                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/commodityInsight" className="btn btn-dark">
                    Show Commodity
                  </a>
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-6 mt-2">
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

                <div className="col-6">
                  <label className="form-label">Country</label>
                  {country.map((info, index) => (
                    <div key={index} className="root my-2">
                      <select value={country.countryName} name="countries" className="mx-1 form-control country-keys">
                        {Object.entries(africanCountryData).map((country, index) => {
                          return <option key={index} value={`${country[0]}___${country[1]}`}>{country[1]}</option>
                        })}

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
              <div>
                <h4>Commodity Information</h4>
                <Editor
                  id="mytextarea"
                  name="briefHistory"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onChange={handleEditor}
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
                <label className="form-label mx-2">Upload Product</label>
                <input type="file" id="image" name="image" accept="image/*" />
              </div>

              <div style={{ textAlign: "start" }}>
                <button className="btn btn-dark">
                  Submit
                </button>
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

export default NewCommodity;
