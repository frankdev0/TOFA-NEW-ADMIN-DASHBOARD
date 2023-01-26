import React, { useState } from "react";

function ChatInput({ handleSendMsg, buyerId }) {
  const [msg, setMsg] = useState("");

  const handleSetMessage = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg, buyerId);
      setMsg("");
      const chatInput = document.querySelector("#chatInput");
      chatInput.focus();
    }
  };
  return (
    <form className="chat-form" onSubmit={handleSendMessage}>
      <textarea
        id="chatInput"
        className="form-control"
        placeholder="Type message"
        rows="1"
        onChange={handleSetMessage}
        value={msg}
        onKeyDown={(event) => {
          event.key === "Enter" && handleSendMessage(event);
        }}
      />
      <div className="chat-form-buttons">
        <button type="button" className="btn btn-link">
          <i className="far fa-smile"></i>
        </button>

        <div className="send">
          <input
            accept="image/x-png,image/gif,image/jpeg, .pdf, .doc, .docx"
            type="file"
            className="custom-file-input"
            id="customFile"
            style={{ display: "none" }}
          />
          <label className="custom-file-label" htmlFor="customFile">
            <i className="fas fa-paperclip"></i>
          </label>
          <button className="btn btn-link" type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
