import React, { useState } from "react";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const handleSetMessage = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
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
      />
      <div className="chat-form-buttons">
        <button type="button" className="btn btn-link">
          <i className="far fa-smile"></i>
        </button>
        <div className="send">
          {/* <input
            multiple={true}
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={selectImageHandler}
            style={{ display: "none" }}
          />
          <label className="custom-file-label" htmlFor="customFile">
            <i className="fas fa-paperclip"></i>
          </label> */}
          <button className="btn btn-dark" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
