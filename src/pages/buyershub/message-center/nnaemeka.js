// import React, { useContext, useRef, useState, useEffect } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import avatar1 from "../../../assets/avatar-1.jpg";
// import { AppContext } from "../../../utils/contexts/AppState";
// import dayjs from "dayjs";
// import io from "socket.io-client";
// import "./message.css";
// import { NewOrderModal } from "./NewOrder";
// import ChatInput from "./ChatInput";
// import { axios } from "../../components/baseUrl";

// const MessageCenter = () => {
//   const [messageList, setMessageList] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [doc, setDoc] = useState(false);
//   const [myDoc, setMyDoc] = useState("");

//   const socketEvents = {
//     connection: "connection",
//     addUser: "add-user",
//     sendMessage: "send-message",
//     receiveMessage: "receive-message",
//     disconnect: "disconnect",
//   };

//   const dataResponse = useContext(AppContext);
//   const employee = dataResponse.user.fullName;

//   const newHandle = (e) => {
//     setMyDoc(e.target.files[0]);
//     console.log(e.target.files[0].type);
//     // if (
//     //   myFile.type ===
//     //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//     //   "application/pdf"
//     // ) {
//     //   setDoc(true);
//     // }
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const {
//           data: { data },
//         } = await axios.get(
//           `/message/receive-message/4419e026-33e3-404a-9ecb-5b47d79943a1`
//         );
//         console.log(data);
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//     console.log("this is the imagesArray", imagesArray);

//       console.log(payload);

//       socket.current.emit(socketEvents.sendMessage, payload);
//       axios.post("/message/send-message", payload);

//     const obj = {
//       id: Math.random(),
//       own: true,
//       email: dataResponse.email,
//       time: new Date(),
//       message: currentMessage,
//       imgs: selectedImages,
//     };

//     setMessageList((prevState) => [...prevState, obj]);
//     setCurrentMessage("");
//     setSelectedImages([]);
//   };

//   return (
//     <div>
//       {/* <!-- main wrapper --> */}
//       <div className="dashboard-main-wrapper">
//         {/* <!-- navbar --> */}
//         <Navbar />

//         {/* <!-- left sidebar --> */}
//         <Sidebar />

//         {/* <!-- wrapper  --> */}
//         <div className="dashboard-wrapper">
//           <div className="container-fluid pr-0">
//             <div className="page-aside">
//               <div className="aside-content">
//                 <div className="aside-header border-bottom">
//                   <button
//                     className="navbar-toggle"
//                     data-target=".aside-nav"
//                     data-toggle="collapse"
//                     type="button"
//                   >
//                     <span className="icon">
//                       <i className="fas fa-caret-down"></i>
//                     </span>
//                   </button>
//                   <span className="title">Message Center</span>
//                 </div>
//                 <div className="aside-nav collapse aside-body">
//                   <div className="chat-list">
//                     <a href="comingsoon" className="btn-account" role="button">
//                       <span className="user-avatar">
//                         <img
//                           src={avatar1}
//                           alt="User Avatar"
//                           className="user-avatar-lg rounded-circle"
//                         />
//                       </span>
//                       <div className="account-summary">
//                         <h5 className="account-name">John Abraham</h5>
//                         <span className="account-description">
//                           john.ab@gmail.com
//                         </span>
//                       </div>
//                     </a>
//                     <hr />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="main-content container-fluid p-0">
//               <div className="chat-header bg-white border-bottom">
//                 <h2 className="active-user-chat">{employee}</h2>
//               </div>
//               <div className="content-container">
//                 <div className="chat-module">
//                   <div className="chat-module-top">
//                     <div className="chat-module-body border-bottom">
//                       <div>
//                         <img
//                           alt="Kimberly"
//                           src={avatar1}
//                           className="rounded-circle user-avatar-lg"
//                         />
//                         {messages.map((msg, index) => {
//                           return (
//                             <div className="media-body" key={index}>
//                               <div className={`chat-item-body`}>
//                                 {msg && msg.message}

//                                 <div className="mt-2">
//                                   {doc && <p>I love this</p>}
//                                   {!doc &&
//                                     msg.imgs.length > 0 &&
//                                     msg.imgs.map((img, i) => (
//                                       // <img
//                                       //   key={`image-${i}`}
//                                       //   width={100}
//                                       //   height={100}
//                                       //   src={img}
//                                       // />
//                                       <img
//                                         key={`image-${i}`}
//                                         type="docx/pdf"
//                                         src={img}
//                                         width={100}
//                                         height={100}
//                                       />
//                                     ))}
//                                 </div>
//                               </div>
//                               <div> {msg && msg.email} </div>
//                               <span>
//                                 {dayjs(msg.time).format("D MMMM YYYY")}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="chat-module-bottom">
//                     <div align="right" className="my-3">

//                       <button
//                         data-bs-toggle="modal"
//                         data-bs-target="#orderModal"
//                         className="start-btn btn btn-dark me-2"
//                         align="right"
//                       >
//                         Start Order
//                       </button>
//                     </div>
//                     {/* <!-- Modal --> */}
//                     <NewOrderModal />

//                     <form className="chat-form" onSubmit={handleSubmit}>
//                       <textarea
//                         className="form-control"
//                         placeholder="Type message"
//                         rows="1"
//                         value={currentMessage}
//                         onChange={handleChange}
//                       />
//                       <div className="chat-form-buttons">
//                         <button type="button" className="btn btn-link">
//                           <i className="far fa-smile"></i>
//                         </button>

//                         <div className="send">
//                           <input
//                             accept="image/x-png,image/gif,image/jpeg, .pdf, .doc, .docx"
//                             type="file"
//                             className="custom-file-input"
//                             id="customFile"
//                             onChange={selectImageHandler}
//                             style={{ display: "none" }}
//                           />
//                           <label
//                             className="custom-file-label"
//                             htmlFor="customFile"
//                           >
//                             <i className="fas fa-paperclip"></i>
//                           </label>
//                           <button className="btn btn-link" type="submit">
//                             <i
//                               className="fa fa-paper-plane"
//                               aria-hidden="true"
//                             ></i>
//                           </button>
//                           {/* <input type="file" onChange={newHandle} /> */}
//                         </div>

//                       </div>
//                     </form>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <!-- end main wrapper --> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageCenter;
