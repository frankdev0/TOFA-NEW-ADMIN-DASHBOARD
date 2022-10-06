import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import avatar1 from "../../../assets/avatar-1.jpg";
import { AppContext } from "../../../utils/contexts/AppState";
import dayjs from "dayjs";
import "./message.css";

const MessageCenter = () => {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const dataResponse = useContext(AppContext);

  const selectImageHandler = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // console.log(imagesArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentMessage && selectedImages.length === 0) return;

    const obj = {
      id: Math.random(),
      own: true,
      email: dataResponse.email,
      time: new Date(),
      message: currentMessage,
      imgs: selectedImages,
    };
    // console.log(selectedImages);
    setMessageList((prevState) => [...prevState, obj]);
    setCurrentMessage("");
    setSelectedImages([]);
  };
  return (
    <div>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        {/* <!-- navbar --> */}
        <Navbar />

        {/* <!-- left sidebar --> */}
        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid pr-0">
            <div className="page-aside">
              <div className="aside-content">
                <div className="aside-header border-bottom">
                  <button
                    className="navbar-toggle"
                    data-target=".aside-nav"
                    data-toggle="collapse"
                    type="button"
                  >
                    <span className="icon">
                      <i className="fas fa-caret-down"></i>
                    </span>
                  </button>
                  <span className="title">Message Center</span>
                </div>
                <div className="aside-nav collapse aside-body">
                  <div className="chat-list">
                    <a href="comingsoon" className="btn-account" role="button">
                      <span className="user-avatar">
                        <img
                          src={avatar1}
                          alt="User Avatar"
                          className="user-avatar-lg rounded-circle"
                        />
                      </span>
                      <div className="account-summary">
                        <h5 className="account-name">John Abraham</h5>
                        <span className="account-description">
                          john.ab@gmail.com
                        </span>
                      </div>
                    </a>
                    <hr />
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content container-fluid p-0">
              <div className="chat-header bg-white border-bottom">
                <h2 className="active-user-chat">John Abraham </h2>
              </div>
              <div className="content-container">
                <div className="chat-module">
                  <div className="chat-module-top">
                    <div className="chat-module-body border-bottom">
                      <div>
                        <img
                          alt="Kimberly"
                          src={avatar1}
                          className="rounded-circle user-avatar-lg"
                        />
                        {messageList.map((msg, index) => {
                          return (
                            <div className="media-body" key={index}>
                              <div className="chat-item-body">
                                {msg && msg.message}
                                <div className="mt-2">
                                  {msg.imgs.length > 0 &&
                                    msg.imgs.map((img, i) => (
                                      <img
                                        key={`image-${i}`}
                                        width={100}
                                        height={100}
                                        src={img}
                                      />
                                    ))}
                                </div>
                              </div>
                              <div>{msg && msg.email}</div>
                              <span>
                                {dayjs(msg.time).format("D MMMM YYYY")}
                              </span>
                            </div>
                          );
                        })}

                        <div> {}</div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-module-bottom">
                    <div align="right">
                      <a
                        href="comingsoon"
                        className="btn btn-rounded btn-outline-dark mb-3 chat-btn"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Start Order
                      </a>
                    </div>
                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Place New Order
                            </h5>
                            <a
                              href="comingsoon"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </a>
                          </div>
                          <div className="modal-body">
                            <p>
                              Woohoo, You are readng this text in a modal! Use
                              Bootstrap’s JavaScript modal plugin to add dialogs
                              to your site for lightboxes, user notifications,
                              or completely custom content.
                            </p>
                          </div>
                          <div className="modal-footer">
                            <a
                              href="comingsoon"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </a>
                            <a href="comingsoon" className="btn btn-primary">
                              Save changes
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form className="chat-form" onSubmit={handleSubmit}>
                      <textarea
                        className="form-control"
                        placeholder="Type message"
                        rows="1"
                        value={currentMessage}
                        onChange={handleChange}
                      />
                      <div className="chat-form-buttons">
                        <button type="button" className="btn btn-link">
                          <i className="far fa-smile"></i>
                        </button>
                        <div className="send">
                          <input
                            multiple={true}
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={selectImageHandler}
                            style={{ display: "none" }}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            <i className="fas fa-paperclip"></i>
                          </label>
                          <button className="btn btn-dark" type="submit">
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end main wrapper --> */}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
