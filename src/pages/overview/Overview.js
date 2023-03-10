import React from "react";
import { Protectedd } from "../../utils/Protectedd";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Overview = () => {
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
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-inline-block">
                            <h5 className="text-muted">Total Views</h5>
                            <h2 className="mb-0"> 90,280</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protectedd(Overview);
