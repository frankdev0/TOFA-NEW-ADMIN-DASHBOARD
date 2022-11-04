import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";


const Page404 = () => {
  return (
    <div className="dashboard-main-wrapper">
    <Navbar/>
    <Sidebar/>

      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
            <div className="d-flex justify-content-center align-items-center">
            <h3>Page Not Found</h3>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Page404;
