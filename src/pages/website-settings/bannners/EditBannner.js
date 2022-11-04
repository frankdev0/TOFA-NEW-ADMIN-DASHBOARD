import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Protectedd } from "../../../utils/Protectedd";

const EditBanner = () => {
  const editorRef = useRef();

  // const editorRef = useRef();

  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { bannerId } = useParams();

  const getInfo = async () => {
    try {
      const response = await axios.get(`/banner/${bannerId}`);
      setCallToAction(response.data.data.callToAction);
      setImage(response.data.data.image);
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
    e.preventDefault();
    const jsonData = {
      callToAction: callToAction,
      link: link,
    };
    const formData = new FormData();
    for (const property in jsonData) {
      formData.append(`${property}`, jsonData[property]);
    }
    formData.append("image", imageFile);
    console.log(imageFile);
    const { data: result } = await axios.patch(`/banner/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
          <div>
            <form className="mx-5 my-5" onSubmit={handleUpdate}>
              <div className="d-flex justify-content-between">
                <h2> Edit Banner</h2>
                {/* <Link to="/commodityInsight">
                <button className="btn btn-primary m-3">Show Commodity</button>
              </Link> */}
                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/banners" className="btn btn-dark">
                    Back
                  </a>
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-6 mt-2">
                  <label className="form-label">Call To Action:</label>
                  <input
                    value={callToAction}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setCallToAction(e.target.value)}
                  />
                </div>
                <div className="col-6 mt-2">
                  <label className="form-label">Call To Action:</label>
                  <input
                    value={link}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label mx-2">Upload Banner</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  name="image"
                  accept="image/*"
                />
                <img
                  src={image}
                  alt="banner image"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div style={{ textAlign: "start" }}>
                <button className="btn btn-dark">Submit</button>
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

export default Protectedd(EditBanner, ["SUPER_ADMIN", "WEBSITE_ADMIN"]);
