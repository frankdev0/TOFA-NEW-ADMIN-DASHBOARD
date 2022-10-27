import React, { useContext, useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import avatar1 from "../../../assets/avatar-1.jpg";
import { AppContext } from "../../../utils/contexts/AppState";
import dayjs from "dayjs";
import io from "socket.io-client";
import "./message.css";
import { NewOrderModal } from "./NewOrder";
import ChatInput from "./ChatInput";
import { axios } from "../../components/baseUrl";

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const { user } = useContext(AppContext);

  const socketEvents = {
    connection: "connection",
    addUser: "add-user",
    sendMessage: "send-message",
    receiveMessage: "receive-message",
    disconnect: "disconnect",
  };

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8081");
      socket.current.emit(socketEvents.addUser, user.id, user.type);
      socket.current.on(socketEvents.receiveMessage, (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `/message/receive-message/4419e026-33e3-404a-9ecb-5b47d79943a1`
        );
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMsg = (msg) => {
    try {
      const payload = {
        to: "4419e026-33e3-404a-9ecb-5b47d79943a1",
        from: user.id,
        message: msg,
        messageType: "MESSAGE",
        sender: user.type,
      };

      console.log(payload);

      socket.current.emit(socketEvents.sendMessage, payload);
      axios.post("/message/send-message", payload);

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
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
                        {messages.map((msg, index) => {
                          return (
                            <div
                              className="media-body"
                              ref={scrollRef}
                              key={index}
                            >
                              <div className="chat-item-body">
                                {msg.message}
                              </div>
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
                      {/* <a
                        href="comingsoon"
                        className="btn btn-rounded btn-outline-dark mb-3 chat-btn"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Start Order
                      </a> */}
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#orderModal"
                        className="msg-center-btn btn-primary me-2"
                        align="right"
                      >
                        Start Order
                      </button>
                    </div>
                    {/* <!-- Modal --> */}
                    <NewOrderModal />
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
                    <ChatInput handleSendMsg={handleSendMsg} />
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
