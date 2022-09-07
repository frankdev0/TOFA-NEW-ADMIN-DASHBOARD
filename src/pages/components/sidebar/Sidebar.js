import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tofa, setTofa] = useState(false);
  const [supplier, setSupplier] = useState(false);
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
                    <span onClick={() => setOpen(!open)} className='headings'>
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
                        <a className="nav-link" href="/traction">
                          Traction
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/testimonial">
                          Testimonials
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/banners">
                          Banners
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
                  <div className="sidebar-title">
                    <span onClick={() => setIsOpen(!isOpen)} className='headings'>
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
                    <span onClick={() => setTofa(!tofa)} className='headings'>
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
                    <span onClick={() => setSupplier(!supplier)} className='headings'>
                      <i className="icon-grid"></i>Suppliers Marketplace
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
                          Orders
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
                          Suppliers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="data-tables.html">
                          Subscriptions
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
                    href="comingsoon"
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
    </>
  );
};

export default Sidebar;
