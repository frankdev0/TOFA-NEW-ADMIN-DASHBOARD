import React, { useState, useRef } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openWeb, setOpenWeb] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isWebOpen, setIsWebOpen] = useState(false);
  const [tofa, setTofa] = useState(false);
  const [tofaBg, setTofaBg] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [supplierBg, setSupplierBg] = useState(false);

  const [toggleLogout, setToggleLogout] = useState(false);

  const toggleRef = useRef();

  return (
    <>
      <div className="nav-left-sidebar sidebar-light">
        <div className="menu-list">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="d-xl-none d-lg-none" href="comingsoon">
              Dashboard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setToggleLogout(!toggleLogout)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav flex-column">
                <li className="nav-divider">Dashboard Main Menu</li>
                <li className="nav-item" style={{ textAlign: "left" }}>
                  <a
                    className="nav-link"
                    href="/overview"
                    aria-expanded="false"
                    data-target="#submenu-1"
                    aria-controls="submenu-1"
                  >
                    <i className="icon-screen-desktop"></i>Overview{" "}
                  </a>
                </li>

                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                  <div className="sidebar-title">
                    <span onClick={() => setOpen(!open)} className="headings">
                      <i className="icon-globe"></i>
                      Website Settings
                    </span>
                    <i
                      className="bi bi-caret-right-fill toggle-btn"
                      onClick={() => setOpen(!open)}
                    ></i>
                  </div>

                  <div className="sidebar-content">
                    <ul
                      className="nav flex-column"
                      style={{ textAlign: "left" }}
                    >
                      <li className="nav-item">
                        <a className="nav-link" href="/banners">
                          Banners
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/commodityinsight">
                          Commodity Insight
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link " href="/faq">
                          FAQ's
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="/partnerships">
                          Partnerships
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="/testimonial">
                          Testimonials
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/traction">
                          Traction
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
                  <div className="sidebar-title">
                    <span
                      onClick={() => setIsOpen(!isOpen)}
                      className="headings"
                    >
                      <i className="icon-bag"></i>
                      Buyer's Hub
                    </span>
                    <i
                      className="bi bi-caret-right-fill toggle-btn"
                      onClick={() => setIsOpen(!isOpen)}
                    ></i>
                  </div>
                  <div className="sidebar-content">
                    <ul
                      className="nav flex-column"
                      style={{ textAlign: "left" }}
                    >
                      <li className="nav-item">
                        <a className="nav-link" href="/orders">
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/products">
                          Products
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/message">
                          Message Center
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/inquiry">
                          Inquiries
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/disputes">
                          Disputes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/buyers">
                          Buyers
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={tofa ? "sidebar-item open" : "sidebar-item"}>
                  <div className="sidebar-title">
                    <span onClick={() => setTofa(!tofa)} className="headings">
                      <i className="icon-graduation"></i>
                      TOFA Academy
                    </span>
                    <i
                      className="bi bi-caret-right-fill toggle-btn"
                      onClick={() => setTofa(!tofa)}
                    ></i>
                  </div>
                  <div className="sidebar-content">
                    <ul
                      className="nav flex-column"
                      style={{ textAlign: "left" }}
                    >
                      <li className="nav-item">
                        <a className="nav-link" href="/applicants">
                          Applicants
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={supplier ? "sidebar-item open" : "sidebar-item"}
                >
                  <div className="sidebar-title">
                    <span
                      onClick={() => setSupplier(!supplier)}
                      className="headings"
                    >
                      <i className="icon-grid"></i>Marketplace
                    </span>
                    <i
                      className="bi bi-caret-right-fill toggle-btn"
                      onClick={() => setSupplier(!supplier)}
                    ></i>
                  </div>
                  <div className="sidebar-content">
                    <ul
                      className="nav flex-column"
                      style={{ textAlign: "left" }}
                    >
                      <li className="nav-item">
                        <a className="nav-link" href="general-table.html">
                          Buyers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="general-table.html">
                          Sellers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="general-table.html">
                          Transactions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="general-table.html">
                          Category
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          RFQ's
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          Product Listing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          Disputes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          Sellers Subscriptions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          Adverts
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <li className="nav-item" style={{ textAlign: "left" }}>
                  <a
                    className="nav-link"
                    href="/users"
                    aria-expanded="false"
                    data-target="#submenu-6"
                    aria-controls="submenu-6"
                  >
                    <i className="icon-user"></i>Users
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Sidebar for mobile view */}
      <div className="sidebar">
        <div
          className={toggleLogout ? "sub-menu-wrap-two" : "sub-menu-wrap"}
          id="subMenu"
          ref={toggleRef}
        >
          <div className="sidebar-bg">
            <div className={openWeb ? "sidebar-item open" : "sidebar-item"}>
              <div className="sidebar-title-two">
                <span className="headings" onClick={() => setOpenWeb(!openWeb)}>
                  <i
                    className="icon-globe"
                    onClick={() => setOpenWeb(!openWeb)}
                  ></i>
                  Website Settings
                </span>
                <i className="bi bi-caret-right-fill toggle-btn"></i>
              </div>

              <div className="sidebar-content">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="/banners">
                      Banners
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/commodityinsight">
                      Commodity Insight
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/faq">
                      FAQ's
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/partnerships">
                      Partnerships
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/testimonial">
                      Testimonials
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/traction">
                      Traction
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={isWebOpen ? "sidebar-item open" : "sidebar-item"}>
              <div className="sidebar-title-three">
                <span
                  className="headings-two"
                  onClick={() => setIsWebOpen(!isWebOpen)}
                >
                  <i className="icon-bag"></i>
                  Buyer's Hub
                </span>
                <i className="bi bi-caret-right-fill toggle-btn"></i>
              </div>
              <div className="sidebar-content">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="/orders">
                      Orders
                    </a>
                  </li>
                  <li className="nav-item-two">
                    <a className="nav-link" href="/products">
                      Products
                    </a>
                  </li>
                  <li className="nav-item-two">
                    <a className="nav-link" href="/message">
                      Message Center
                    </a>
                  </li>
                  <li className="nav-item-two">
                    <a className="nav-link" href="/inquiry">
                      Inquiries
                    </a>
                  </li>
                  <li className="nav-item-two">
                    <a className="nav-link" href="/disputes">
                      Disputes
                    </a>
                  </li>
                  <li className="nav-item-two">
                    <a className="nav-link" href="/buyers">
                      Buyers
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={tofaBg ? "sidebar-item open" : "sidebar-item"}>
              <div className="sidebar-title-two">
                <span onClick={() => setTofaBg(!tofaBg)} className="headings">
                  <i className="icon-graduation"></i>
                  TOFA Academy
                </span>
                <i
                  className="bi bi-caret-right-fill toggle-btn"
                  onClick={() => setTofaBg(!tofaBg)}
                ></i>
              </div>
              <div className="sidebar-content">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="/applicants">
                      Applicants
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={supplierBg ? "sidebar-item open" : "sidebar-item"}>
              <div className="sidebar-title-two">
                <span
                  className="headings"
                  onClick={() => setSupplierBg(!supplierBg)}
                >
                  <i className="icon-grid"></i>Marketplace
                </span>
                <i
                  className="bi bi-caret-right-fill toggle-btn"
                  onClick={() => setSupplierBg(!supplierBg)}
                ></i>
              </div>
              <div className="sidebar-content">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="general-table.html">
                      Buyers
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="general-table.html">
                      Sellers
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="general-table.html">
                      Transactions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="general-table.html">
                      Category
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="data-tables.html">
                      RFQ's
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="data-tables.html">
                      Product Listing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="data-tables.html">
                      Disputes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="data-tables.html">
                      Sellers Subscriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="data-tables.html">
                      Adverts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <li className="nav-item">
          <a
            className="nav-link"
            href="/users"
            aria-expanded="false"
            data-target="#submenu-6"
            aria-controls="submenu-6"
          >
            <i className="icon-user"></i>Users
          </a>
        </li> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
