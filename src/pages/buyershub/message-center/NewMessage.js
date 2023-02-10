import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatInput from "./ChatInput";
import { NewOrderModal } from "./NewOrder";

const NewMessage = () => {
  return (
    <div>
      <div className="dashboard-main-wrapper">
        <Navbar />
        <Sidebar />
      </div>
      <div className="row message-headers">
        <div className="col-3 message-list-header">
          <p className="text-dark">Message Center is here</p>
        </div>
        <div className="col-9 message-body-header">
          <p>Name of Messenger</p>
        </div>
      </div>
      <div className="row contact-body">
        <div className="col-3 message-list-body">
          <p className="text-dark">Messages</p>
        </div>
        <div className="col-9 new-message-body">
          <div className="body-two">
            <p>Select A Buyer to Chat With</p>
          </div>

          <div className="inputfield">
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
              <NewOrderModal />

              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
