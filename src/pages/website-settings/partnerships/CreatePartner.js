import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { dark } from "@mui/material/styles/createPalette";
import { Protectedd } from "../../../utils/Protectedd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatePartner = () => {
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  const [partnerName, setPartnerName] = useState("");
  //   const [partnerLogo, setPartnerLogo] = useState("")

  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  const handleChange = (e) => {
    setPartnerName({ ...partnerName, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const jsonData = {
        partnerName,
      };
      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }
      formData.append("image", e.target.image.files[0]);
      console.log(e.target.image.files[0]);
      const { data: result } = await axios.post("/partner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        navigate(-1);
      }, 3000);
      toast.success("SUCCESSFULLY CREATED FAQ", {
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
    if (!formErrors.question || !formErrors.answer) {
      //   navigate("/faq");
      // } else {
      //   toast.error("FILL IN THE FIELDS"),
      //     {
      //       position: "top-right",
      //       autoClose: 8000,
      //       pauseHover: true,
      //       draggable: true,
      //       className: dark,
      //     };
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
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header">
                    <h2 className="pageheader-title">Partnerships</h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Edit Partner</h5>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Partner Name
                          </label>
                          <input
                            name="partnerName"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                          />
                          {formErrors.question && (
                            <p className="text-danger">
                              {formErrors.partnerName}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            Upload Parnter Logo
                          </label>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={onSelectFile}
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
                          {formErrors.answer && (
                            <p className="text-danger">
                              {formErrors.partnerLogo}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-dark"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
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

export default Protectedd(CreatePartner, ["WEBSITE_ADMIN", "SUPER_ADMIN"]);
