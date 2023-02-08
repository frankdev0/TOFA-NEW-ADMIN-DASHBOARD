import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const NewMessage = () => {
  return (
    <div>
      <div className="dashboard-main-wrapper">
        <Navbar />
        <Sidebar />
      </div>
    </div>
  );
};

export default NewMessage;
