import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import avatar1 from "../../../assets/avatar-1.jpg";
import { AppContext } from "../../../utils/contexts/AppState";
import dayjs from "dayjs";

const MessageCenter = () => {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [image, setImage] = useState([]);

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const dataResponse = useContext(AppContext);

  const selectImageHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentMessage) return false;
    const obj = {
      id: Math.random(),
      own: true,
      email: dataResponse.email,
      time: new Date(),
      message: currentMessage,
    };
    setMessageList((prevState) => [...prevState, obj]);
    setCurrentMessage("");
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
                    <a
                      href="comingsoon"
                      className="btn-account"
                      role="button"
                      style={{ textDecoration: "none" }}
                    >
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
                <h2 className="active-user-chat">John Abraham</h2>
              </div>
              <div className="content-container">
                <div className="chat-module">
                  <div className="chat-module-top">
                    <div className="chat-module-body border-bottom">
                      {/* <div className="media chat-item">
                                        <img alt="Daniel" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Daniel</span>
                                                <span>Yesterday</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Quisque condimentum elit quis nibh condimentum, in maximus tortor viverra. 🤓</p>
                                            </div>
                                            <div className="media media-attachment">
                                                <div className="avatar bg-primary">
                                                    <i className="fas fa-file"></i>
                                                </div>
                                                <div className="media-body">
                                                    <a href="comingsoon" className="">questionnaire-draft.doc</a>
                                                    <span>24kb Document</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                      <div>
                        <img
                          alt="Kimberly"
                          src={avatar1}
                          className="rounded-circle user-avatar-lg"
                        />
                        {messageList.map((msg, index) => {
                          console.log(msg);
                          return (
                            <div className="media-body" key={index}>
                              <div className="chat-item-body">
                                {msg && msg.message}
                              </div>
                              <div>{msg && msg.email}</div>
                              <span>
                                {dayjs(msg.time).format("D MMMM YYYY")}
                              </span>
                            </div>
                          );
                        })}
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
                        <div className="custom-file custom-file-naked">
                          <input
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
