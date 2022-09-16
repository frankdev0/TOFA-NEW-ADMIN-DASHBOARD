import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ userInfo });
      const { data } = await axios.post("/auth/signin", {
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      });
      console.log(data);
    } catch (err) {
      if (err.response.data.errors[0].field) {
        setFormErrors(
          err.response.data.errors.reduce(function(obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
      } else {
        console.log(err.response.data.errors[0].message);
        setCustomError(err.response.data.errors[0].message);
        alert(customError);
      }
    }
    if (!formErrors.email || !formErrors.password) {
      navigate("/overview");
    }
  };
  return (
    <div>
      <section>
        {/* <!-- ============================================================== -->
    <!-- login page  -->
    <!-- ============================================================== --> */}
        <div className="splash-container">
          <div className="card ">
            <div className="card-header text-center">
              <div>
                <img
                  width="100px"
                  className="logo-img mb-3"
                  src={logo}
                  alt="logo"
                />
              </div>
              <span className="splash-description">
                Enter New Password to Login
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-danger">{formErrors.email}</p>
                )}
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    id="password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </div>
                {/* {formErrors.pass} */}
                <button type="submit" className="btn btn-dark btn-lg btn-block">
                  Login in
                </button>
              </form>
            </div>
            <div className="card-footer bg-white p-0  ">
              <div className="card-footer-item card-footer-item-bordered">
                <a href="link" className="footer-link">
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmPassword;
