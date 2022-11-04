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
import { Protectedd } from "../../../utils/Protectedd";

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  // const [viewLoader, setViewLoader] = useState([])
  const [viewMessage, setViewMessage] = useState([]);
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

  const dataResponse = useContext(AppContext);
  const employee = dataResponse.user.fullName;

  // const Capitalize = (str) => {
  //   return str.charAt(0);
  // };

  useEffect(() => {
    if (user) {
      socket.current = io(
        "http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com"
      );
      socket.current.emit(socketEvents.addUser, user.id, user.type);
      socket.current.on(socketEvents.receiveMessage, (msg) => {
        console.log("this ran");
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
          `/message/receive-message/b93998b2-d1c8-460a-97e5-46fa3cd1541f`
        );
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const showDetails = (messageID) => {
    //  setViewLoader(true);
    axios.get(`/message/receive-message/${messageID}`).then((response) => {
      setViewMessage(response.data);
      console.log(response.data);
      //  setViewLoader(false);
    });
  };

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
        to: "b93998b2-d1c8-460a-97e5-46fa3cd1541f",
        from: user.id,
        message: msg,
        messageType: "MESSAGE",
        sender: user.type,
      };

      console.log(payload);

      socket.current.emit(socketEvents.sendMessage, payload);
      axios.post("/message/send-message", payload);

      // const msgs = [...messages];
      // msgs.push({ fromSelf: true, message: msg });
      // setMessages(msgs);
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
        <div className="dashboard-wrap">
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
                    {/* <a href="comingsoon" className="btn-account" role="button"> */}
                    {/* <span className="user-avatar">
                        <img
                          src={avatar1}
                          alt="User Avatar"
                          className="user-avatar-lg rounded-circle"
                        />
                      </span> */}

                    {messages.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className=" d-flex account-summary my-2"
                          onClick={(e) => showDetails(item.id)}
                        >
                          <h5 className="account-name">{index + 1}</h5>

                          <span className="account-description px-2">
                            {item && item.fromSelf === false && item.message}
                          </span>
                        </div>
                      );
                    })}
                    {/* </a> */}
                    <hr />
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content container-fluid p-0">
              <div className="chat-header bg-white border-bottom">
                <h2 className="active-user-chat">{employee}</h2>
              </div>
              <div className="content-container">
                <div className="chat-module">
                  <div className="chat-module-top">
                    <div className="chat-module-body border-bottom">
                      {viewMessage ? (
                        <div>...Select A User to Respond to</div>
                      ) : (
                        <div>
                          <img
                            alt="Kimberly"
                            src={avatar1}
                            className="rounded-circle user-avatar-lg"
                          />
                          {messages.map((msg, index) => {
                            return (
                              <div
                                className={
                                  msg.fromSelf ? "mediaa-body" : "media-body"
                                }
                                ref={scrollRef}
                                key={index}
                              >
                                <div
                                  className={
                                    msg.fromSelf ? "sender" : "receiver"
                                  }
                                >
                                  <div className="chat-item-ody">
                                    {msg.message}
                                    <p className="chat-timestamp">
                                      {dayjs(msg.createdAt).format("hh:mm a")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="chat-module-bottom">
                    <div align="right" className="my-3">
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
                        className="start-btn btn btn-dark me-2"
                        align="right"
                      >
                        Start Order
                      </button>
                    </div>
                    {/* <!-- Modal --> */}
                    <NewOrderModal />

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

export default Protectedd(MessageCenter);
