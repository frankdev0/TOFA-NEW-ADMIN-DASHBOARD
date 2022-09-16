import React from "react";
import { useOutletContext } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Overview = () => {
  const [currentUser] = useOutletContext();
  console.log(currentUser);

  return (
    <div>
      <div>
        {/* <!-- main wrapper --> */}
        <div className="dashboard-main-wrapper">
          {/* <!-- navbar --> */}
          <Navbar />

          {/* <!-- left sidebar --> */}
          <Sidebar />

          {/* <!-- wrapper  --> */}
          <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
              {/* <!-- pageheader --> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="page-header" style={{ textAlign: "left" }}>
                    <h2 className="pageheader-title">Dashboard Overview</h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* <!-- widgets   --> */}
                  <div className="row">
                    {/* <!-- ============================================================== -->
                        <!-- four widgets   -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- total views   -->
                        <!-- ============================================================== --> */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-inline-block">
                            <h5 className="text-muted">Total Views</h5>
                            <h2 className="mb-0"> 10,280,056</h2>
                          </div>
                          <div
                            className="float-right icon-circle-medium  icon-box-lg  bg-info-light mb-2"
                            style={{ textAlign: "center" }}
                          >
                            <i className="fa fa-eye fa-fw fa-sm text-info mt-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ============================================================== -->
                        <!-- end total views   -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- total followers   -->
                        <!-- ============================================================== --> */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-inline-block">
                            <h5 className="text-muted">Total Followers</h5>
                            <h2 className="mb-0"> 24,763</h2>
                          </div>
                          <div
                            className="float-right icon-circle-medium  icon-box-lg  bg-primary-light mb-2"
                            style={{ textAlign: "center" }}
                          >
                            <i className="fa fa-user fa-fw fa-sm text-primary mt-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ============================================================== -->
                        <!-- end total followers   -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- partnerships   -->
                        <!-- ============================================================== --> */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-inline-block">
                            <h5 className="text-muted">Partnerships</h5>
                            <h2 className="mb-0">14</h2>
                          </div>
                          <div
                            className="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mb-2"
                            style={{ textAlign: "center" }}
                          >
                            <i className="fa fa-handshake fa-fw fa-sm text-secondary mt-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ============================================================== -->
                        <!-- end partnerships   -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- total earned   -->
                        <!-- ============================================================== --> */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-inline-block">
                            <h5 className="text-muted">Total Earned</h5>
                            <h2 className="mb-0"> $149.00</h2>
                          </div>
                          <div
                            className="float-right icon-circle-medium  icon-box-lg  bg-brand-light mb-2"
                            style={{ textAlign: "center" }}
                          >
                            <i className="fa fa-money-bill-alt fa-fw fa-sm text-brand mt-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ============================================================== -->
                        <!-- end total earned   -->
                        <!-- ============================================================== --> */}
                  </div>
                  {/* <!-- end widgets   --> */}
                </div>
              </div>
            </div>

            {/* <!-- footer --> */}
            {/* <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  */}
            {/* <!-- end footer --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
