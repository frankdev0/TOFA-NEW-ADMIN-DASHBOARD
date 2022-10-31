import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { africanCountryData } from "../../buyershub/products/africanCountries";
import { toast, ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";

const EditCommodity = () => {
  const [name, setName] = useState("");
  const [briefHistory, setBriefHistory] = useState("");
  const [countries, setCountries] = useState([{ countryName: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef(null);

  // const handleEditor = () => {
  //   setBriefHistory(editorRef.current.getContent());
  // };

  const handleCountryInput = (index, e) => {
    const values = [...countries];
    values[index][e.target.name] = e.target.value;
    setCountries(values);
  };

  const navigate = useNavigate();

  const { commodityId } = useParams();

  const getInfo = async () => {
    try {
      const response = await axios.get(`/commodity/${commodityId}`);
      setName(response.data.data.name);
      setBriefHistory(response.data.data.briefHistory);
      console.log(response.data.data.briefHistory);
      setCountries(response.data.data.countriesTraded);
      console.log(
        "these are the countries",
        response.data.data.countriesTraded
      );
      console.log(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getCountry = () => {
    const countries = document.getElementsByClassName("country-keys");

    const country = [];
    for (let i = 0; i < countries.length; i++) {
      const [countryName, shortName] = countries[i].value.split("___");
      if (countryName && shortName) country.push({ countryName, shortName });
    }
    return JSON.stringify(country);
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      console.log("Breif history from Edit", briefHistory);
      const jsonData = {
        name: name,
        countries: getCountry(),
        briefHistory,
        commodityID: commodityId,
      };
      console.log("EditCommodity", briefHistory);
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      formData.append("image", e.target.image.files[0]);
      console.log("this is json", jsonData);
      // console.log("target files", e.target.image.files[0]);
      const { data } = await axios.patch("/commodity", jsonData);
      console.log(data);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      toast.success("EDITED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
    } catch (error) {
      if (error) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
        console.log(error.response);
      }
    }
  };

  const [country, setCountry] = useState([{ countryName: "" }]);

  const handleAddCountry = () => {
    setCountry([...country, { countryName: "" }]);
  };

  const handleRemoveCountry = (index) => {
    const countryValues = [...country];
    countryValues.splice(index, 1);
    setCountry(countryValues);
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
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar />

        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <ToastContainer />
          <div>
            <form className="mx-5 my-5" onSubmit={handleUpdate}>
              <div className="d-flex justify-content-between">
                <h2> Edit Commodity Insight</h2>

                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/commodityInsight" className="btn btn-dark px-4">
                    Back
                  </a>
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-6 mt-2">
                  <label className="form-label">Commodity Name:</label>
                  <input
                    value={name}
                    name="name"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label">Country</label>
                  {countries &&
                    countries.map((country, index) => (
                      <div className="root my-2" key={country.id}>
                        <select
                          key={country.id}
                          defaultValue={country.countryName}
                          onChange={(e) => handleCountryInput(index, e)}
                          name="countries"
                          className="mx-1 form-control country-keys"
                        >
                          {Object.entries(africanCountryData).map(
                            (country, index) => {
                              return (
                                <option
                                  key={index}
                                  defaultValue={`${country[0]}___${country[1]}`}
                                  // value={name.countryName}
                                >
                                  {country[1]}
                                  {/* {country.countryName} */}
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
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ textAlign: "left" }}>
                <h4>Commodity Information</h4>

                <JoditEditor
                  name="briefHistory"
                  ref={editorRef}
                  value={briefHistory.split("&lt;").join("<")}
                  tabIndex={1}
                  onChange={(newContent) => setBriefHistory(newContent)}
                />
              </div>

              <div className="mb-3" style={{ textAlign: "left" }}>
                <label
                  className="fw-bold form-label mx-2 my-2 text-bold"
                  htmlFor="firstimg"
                >
                  Upload Commodity
                  <br />
                  <i
                    className="my-2 fa fa-cloud-upload img-upload"
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
                <button className="btn btn-dark px-5 py-2" type="submit">
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

export default EditCommodity;
