import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Protectedd } from "../../../utils/Protectedd";

const EditBanner = () => {
  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState();
  const [imageBanner, setImageBanner] = useState(null);

  console.log("this is the new banner", imageBanner);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { bannerId } = useParams();

  const getInfo = async () => {
    try {
      const response = await axios.get(`/banner/${bannerId}`);
      setCallToAction(response.data.data.callToAction);
      setImage(response.data.data.image);
      console.log(response.data.data.image);
      setLink(response.data.data.link);
      setId(response.data.data.id);
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

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const jsonData = {
      callToAction: callToAction,
      link: link,
    };
    const formData = new FormData();
    for (const property in jsonData) {
      formData.append(`${property}`, jsonData[property]);
    }
    formData.append("image", imageBanner);
    // console.log(imageFile);
    const { data: result } = await axios.patch(`/banner/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    setTimeout(() => {
      navigate(-1);
    }, 4000);
    console.log(result);
    toast.success("EDITED SUCCESSFULLY", {
      position: "top-right",
      autoClose: 4000,
      pauseHover: true,
      draggable: true,
    });
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
          <div className="container-fluid dashboard-content">
            <div className="d-flex justify-content-between">
              <h2> Edit Banner</h2>
              {/* <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-2"
                align="right"
              > */}
              <a href="/banners" className="btn btn-dark">
                Back
              </a>
              {/* </div> */}
            </div>
            <div className="row my-2" style={{ textAlign: "left" }}>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleUpdate}>
                      <div className="form-group">
                        <label htmlFor="inputText3" className="col-form-label">
                          Call to Action
                        </label>
                        <input
                          value={callToAction}
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setCallToAction(e.target.value)}
                        />
                        {/* {formErrors.callToAction && (
                    <p className="text-danger">{formErrors.callToAction}</p>
                  )} */}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputText3" className="col-form-label">
                          Link
                        </label>
                        <input
                          value={link}
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setLink(e.target.value)}
                        />
                        {/* {formErrors.link && (
                    <p className="text-danger">{formErrors.link}</p>
                  )} */}
                      </div>
                      <div className="form-group">
                        <label className="form-label mx-2">
                          Upload Banner{" "}
                          <select
                            name="section"
                            onChange={(e) => setBanner(e.target.value)}
                            defaultValue={banner}
                          >
                            <option>...Select Banner</option>
                            <option>Hero Section Banner</option>
                            <option>Buyers Hub Slider</option>
                          </select>
                        </label>
                        {/* {formErrors.section && (
                    <p className="text-danger">{formErrors.section}</p>
                  )} */}
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) => setImageBanner(e.target.files[0])}
                        />
                        {imageBanner ? (
                          <div className="iamges d-flex image-container">
                            <img
                              src={
                                imageBanner && URL.createObjectURL(imageBanner)
                              }
                              alt="banner"
                              className="image"
                            />
                          </div>
                        ) : (
                          <div className="iamges d-flex image-container">
                            <img src={image} alt="banner" className="image" />
                          </div>
                        )}

                        {/* {formErrors.image && (
                    <p className="text-danger">{formErrors.image}</p>
                  )} */}
                      </div>
                      <div className="form-group">
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
                          <button className="btn btn-dark">
                            Update Banner
                          </button>
                        )}
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
  );
};

export default Protectedd(EditBanner, ["SUPER_ADMIN", "WEBSITE_ADMIN"]);
