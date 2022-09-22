import React from "react";
// import blog from "../../assets/photos/blog.png";
import "./message.css";

const Message = (props) => {
  const { own, email, name, message, time } = props.msg22;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="media chat-item">
          <div className="media-body">
            {/* <div className="chat-item-title">
              <span className="chat-item-author">{email}</span>
              <span>{time}</span>
            </div> */}
            <div className="chat-item-body">{message}</div>
          </div>
        </div>

        {/* <div>
          <img src={blog} alt="" className="messageImg" />
        </div> */}
      </div>
    </div>
  );
};

export default Message;
