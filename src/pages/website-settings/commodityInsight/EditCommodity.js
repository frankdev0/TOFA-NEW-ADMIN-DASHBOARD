import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { africanCountryData } from "../../buyershub/products/africanCountries";
import { toast, ToastContainer } from "react-toastify";

const EditCommodity = () => {
  const editorRef = useRef();

  // const editorRef = useRef();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [briefHistory, setBriefHistory] = useState("");
  const [countries, setCountries] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleEditor = () => {
    setBriefHistory(editorRef.current.getContent());
  };

  const navigate = useNavigate();

  const { commodityId } = useParams();
  console.log(commodityId);

  const getInfo = async () => {
    try {
      const response = await axios.get(`/commodity/${commodityId}`);
      setId(response.data.data.id);
      setName(response.data.data.name);
      setBriefHistory(response.data.data.briefHistory);
      setCountries(response.data.data.countries);
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
      const jsonData = {
        name: name,
        countries: getCountry(),
        briefHistory: briefHistory,
      };
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      formData.append("image", e.target.image.files[0]);
      console.log(e.target.image.files[0]);
      const { data } = await axios.patch(`/commodity/${id}`, jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.success("EDITED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 4000,
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
        console.log(error);
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
    return <h1>Loading</h1>;
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
            <form className="mx-5 my-5">
              <div className="d-flex justify-content-between">
                <h2> Edit Commodity Insight</h2>

                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/commodityInsight" className="btn btn-dark">
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4>Commodity Information</h4>
                <Editor
                  id="mytextarea"
                  name="briefHistory"
                  value={briefHistory}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onChange={handleEditor}
                />
              </div>

              <div className="mb-3" style={{ textAlign: "left" }}>
                {/* {(e) =>
                  e.target.image.files && (
                    <div>
                      <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(e.target.image.files)}
                      />
                    </div>
                  )
                } */}
                <label className="form-label mx-2">Upload Product</label>
                <input type="file" id="image" name="image" accept="image/*" />
              </div>

              <div style={{ textAlign: "start" }}>
                <button className="btn btn-dark" onClick={handleUpdate}>
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
