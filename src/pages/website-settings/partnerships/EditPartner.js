import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Protectedd } from "../../../utils/Protectedd";

const CreatePartner = () => {
  const [id, setId] = useState(0);
  const [partnerName, setPartnerName] = useState("");
  const [partnerLogo, setPartnerLogo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState("");

  //   const [partnerLogo, setPartnerLogo] = useState("")

  const navigate = useNavigate();

  const { myPartnerId } = useParams();

  const getInfo = async () => {
    try {
      const response = await axios.get(`/testimonial/${myPartnerId}`);
      // setTestimonialInfo(response.data.data)
      console.log(response.data.data);
      setId(response.data.data.id);
      setPartnerName(response.data.data.name);
      setPartnerLogo(response.data.data.company);
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
      partnerName,
    };
    const formData = new FormData();
    for (const property in jsonData) {
      formData.append(`${property}`, jsonData[property]);
    }
    formData.append("image", imageFile);
    console.log(imageFile);
    const { data: result } = await axios.patch(`/partner/${id}`, formData, {
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
                      <form onSubmit={handleUpdate}>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Partner Name
                          </label>
                          <input
                            name="partnerName"
                            value={partnerName}
                            type="text"
                            className="form-control"
                            onChange={(e) => setPartnerName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            Upload Parnter Logo
                          </label>
                          <input
                            className="form-control"
                            name="image"
                            id="file"
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                          />
                          <img
                            src={partnerLogo}
                            alt="banner"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div className="form-group">
                          <button className="btn btn-dark" type="submit">
                            Update
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
