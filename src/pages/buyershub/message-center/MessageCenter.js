import React, { useContext, useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
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
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [buyersName, setBuyersName] = useState("");
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

  const myContacts = async () => {
    try {
      axios.get("/admin/contacts").then((response) => {
        setContacts(response.data.data);
        console.log(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function isMsgObject(msg) {
    let isObject;

    try {
      const orderResultObj = JSON.parse(msg);
      if (typeof orderResultObj === "object") {
        isObject = true;
      }
      // console.log(orderResultObj);
    } catch (error) {
      if (error) {
        isObject = false;
      }
    }

    return isObject;
  }

  useEffect(() => {
    myContacts();
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(
        "http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com:8081"
      );
      socket.current.emit(socketEvents.addUser, user.id, user.type);
      socket.current.on(socketEvents.receiveMessage, (msg) => {
        console.log("this ran");
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [user]);

  const showChats = async (buyerId, fullName) => {
    setBuyersName(fullName);
    try {
      const {
        data: { data },
      } = await axios.get(`/message/receive-message/${buyerId}`);
      console.log(data);
      setMessages(data);
      setBuyerId(buyerId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMsg = (msg, buyerId) => {
    try {
      const payload = {
        to: buyerId,
        from: user.id,
        message: msg,
        messageType: "MESSAGE",
        sender: user.type,
      };
      console.log(payload);

      socket.current.emit(socketEvents.sendMessage, payload);
      axios.post("/message/send-message/", payload);

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
                    {contacts &&
                      contacts.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className=" account-summary"
                            onClick={(e) => showChats(item.id, item.fullName)}
                          >
                            <h6 className="fontz buyers-name">
                              {item.fullName}
                              <span className="message-indicator"></span>
                            </h6>
                            <div className="message-list">
                              {item.Message.map((msg) => {
                                return (
                                  <p
                                    className="fontz message-list "
                                    key={item.id}
                                  >
                                    {isMsgObject(msg.message)
                                      ? "Your order has been created"
                                      : msg.message}
                                    {/* {msg.message} */}
                                  </p>
                                );
                              })}
                              <hr />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content container-fluid p-0">
              <div className="chat-header bg-white border-bottom">
                <h2
                  className="active-user-chat"
                  style={{ textAlign: "center" }}
                >
                  {/* {employee} */}
                  {buyersName}
                </h2>
              </div>
              <div className="content-container">
                {loading ? (
                  <div className="mx-auto">....Select a Buyer to Chat With</div>
                ) : (
                  <div className="chat-module">
                    <div className="chat-module-top">
                      <div
                        className="chat-module-body border-bottom"
                        style={{ marginTop: "28px" }}
                      >
                        <div>
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
                                  {isMsgObject(msg.message) && (
                                    <p>Your order has been created</p>
                                  )}
                                  {!isMsgObject(msg.message) && msg.message}
                                  {/* {isMsgObject(msg.message) ? (
                                      <p>Your order has been created</p>
                                    ) : (
                                      msg.message
                                    )} */}
                                  <p className="chat-timestamp">
                                    {dayjs(msg.createdAt).format("hh:mm a")}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="chat-module-bottom">
                      <div align="right" className="my-3">
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
                      <NewOrderModal
                        buyerId={buyerId}
                        handleSendMsg={handleSendMsg}
                      />

                      <ChatInput
                        handleSendMsg={handleSendMsg}
                        buyerId={buyerId}
                      />
                    </div>
                  </div>
                )}
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
