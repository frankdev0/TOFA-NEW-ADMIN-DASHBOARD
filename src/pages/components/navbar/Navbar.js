import React, { useContext, useRef, useState } from "react";
import logo from "../../../assets/logo.JPG";
import { axios } from "../baseUrl";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AppContext } from "../../../utils/contexts/AppState";

const Navbar = () => {
  const [toggleLogout, setToggleLogout] = useState(false);
  const navigate = useNavigate();

  const toggleRef = useRef();

  const dataResponse = useContext(AppContext);
  const employee = dataResponse.user.fullName;

  const Capitalize = (str) => {
    return str.charAt(0);
  };

  const handleLogout = () => {
    axios
      .get("auth/signout")
      .then((response) => {
        console.log("this is from protected route", response.data.currentUser);
        if (response.data.currentUser) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  //   const toggleMyMenu = () => {
  //     toggleRef.current("subMenu");
  //   };

  return (
    <div className="dashboard-header">
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <a className="navbar-brand" href="index.html">
          TOFA ADMIN{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto navbar-right-top">
            <li className="nav-item">
              <div id="custom-search" className="top-search-bar">
                <div
                  style={{
                    backgroundColor: "gray",
                    padding: "8px",
                    borderRadius: "50%",
                    color: "#fff",
                  }}
                  onClick={() => setToggleLogout(!toggleLogout)}
                >
                  {employee && Capitalize(employee)}
                </div>

                {/* <input
                  className="form-control"
                  type="text"
                  placeholder="Search.."
                /> */}
              </div>
            </li>
            <li className="nav-item dropdown notification">
              <a
                className="nav-link nav-icons"
                href="comingsoon"
                id="navbarDropdownMenuLink1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-fw fa-bell"></i>{" "}
                <span className="indicator"></span>
              </a>
            </li>

            <div
              className={toggleLogout ? "sub-menu-wrap-two" : "sub-menu-wrap"}
              id="subMenu"
              ref={toggleRef}
            >
              <div className="sub-menu">
                <div className="user-info">
                  <img
                    src={logo}
                    alt="tobad"
                    className="user-avatar-md rounded-circle"
                  />
                  <h3 className="mt-3 mx-2">Nnaemeka Ogunewe</h3>
                </div>
                <hr />
                <a href="sub-menu-link" className="sub-menu-link">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  {/* <img src={profile} alt="profile" /> */}
                  <p>Edit Profile </p>
                </a>
                <a href="sub-menu-link" className="sub-menu-link">
                  {/* <img src={setting} alt="profile" /> */}
                  <i className="fa fa-cogs" aria-hidden="true"></i>

                  <p>Settings & Privacy </p>
                </a>
                <a href="sub-menu-link" className="sub-menu-link">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  {/* <img src={help} alt="profile" /> */}

                  <p>Help & Support </p>
                </a>
                <Link to="/" className="sub-menu-link">
                  {/* <img src={logout} alt="profile" /> */}
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <p onClick={handleLogout}>Logout </p>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
