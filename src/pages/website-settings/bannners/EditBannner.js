import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const EditBanner = () => {
  const editorRef = useRef();

  // const editorRef = useRef();

  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [callToAction, setCallToAction] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { bannerId } = useParams();
  console.log(bannerId);

  const getInfo = async () => {
    try {
      const response = await axios.get(`/banner/${bannerId}`);
      setCallToAction(response.data.data);
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

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`/banner/${id}`, {
        link: link,
        callToAction: callToAction,
      })
      .then(() => {
        navigate("/banners");
      });
    toast.success("EDITED SUCCESSFULLY", {
      position: "top-right",
      autoClose: 4000,
      pauseHover: true,
      draggable: true,
    });
  };

  if (isLoading) {
    return <div className="loader" id="loader"></div>;
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
                    value={callToAction.callToAction}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setCallToAction(e.target.value)}
                  />
                </div>
                <div className="col-6 mt-2">
                  <label className="form-label">Call To Action:</label>
                  <input
                    value={callToAction.link}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
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

export default EditBanner;