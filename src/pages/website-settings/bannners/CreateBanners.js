import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateBanner = () => {
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [banner, setBanner] = useState({
    action: "",
    link: "",
    section: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    console.log(selectedFiles);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const jsonData = {
        callToAction: banner.action,
        link: banner.link,
        section: banner.section,
      };
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      formData.append("image", e.target.image.files[0]);
      console.log(e.target.image.files[0]);
      const { data: result } = await axios.post("/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        navigate(-1);
      }, 5000);
      toast.success("SUCCESSFULLY CREATED NEW BANNER", {
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
    // if (formErrors.email || formErrors.password) {
    //   navigate("/banner");
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
            <ToastContainer />
            <div className="container-fluid dashboard-content">
              {/* <!-- pageheader --> */}
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header" style={{ textAlign: "left" }}>
                    <h2 className="pageheader-title">Banner</h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h4 className="card-header font-bold">Create Banner</h4>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Call to Action
                          </label>
                          <input
                            id="inputText3"
                            name="action"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.callToAction && (
                            <p className="text-danger">
                              {formErrors.callToAction}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Link
                          </label>
                          <input
                            id="inputText3"
                            name="link"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.link && (
                            <p className="text-danger">{formErrors.link}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label mx-2">
                            Upload Banner{" "}
                            <select name="section" onChange={handleChange}>
                              <option>...Select Banner</option>
                              <option>Hero Section Banner</option>
                              <option>Buyers Hub Slider</option>
                            </select>
                          </label>
                          {formErrors.section && (
                            <p className="text-danger">{formErrors.section}</p>
                          )}
                          <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={onSelectFile}
                            multiple
                          />

                          <div className="iamges d-flex image-container">
                            {selectedImages &&
                              selectedImages.map((image, index) => {
                                return (
                                  <div
                                    key={image}
                                    style={{ position: "relative" }}
                                  >
                                    <img src={image} alt="" className="image" />

                                    <div
                                      className="bin-icon"
                                      style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "0",
                                        color: "red",
                                      }}
                                    >
                                      <IconButton
                                        className="text-danger"
                                        aria-label="delete"
                                        size="small"
                                        onClick={() =>
                                          setSelectedImages(
                                            selectedImages.filter(
                                              (e) => e !== image
                                            )
                                          )
                                        }
                                      >
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </div>
                                  </div>
                                );
                              })}
                            {console.log(selectedImages)}
                          </div>

                          {formErrors.image && (
                            <p className="text-danger">{formErrors.image}</p>
                          )}
                        </div>
                        <div className="form-group">
                          <button className="btn btn-dark">Save Banner</button>
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
      </>
    </div>
  );
};

export default CreateBanner;
