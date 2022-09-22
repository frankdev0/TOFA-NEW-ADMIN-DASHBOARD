import React, { useState, useEffect } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../components/baseUrl";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const { userId, setPasswordToken } = useParams();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    } else if (userInfo.password !== userInfo.confirmPassword) {
      errors.password = "Password and Confirm Password must match";
    } else if (
      userInfo.password.length > 10 ||
      userInfo.confirmPassword.length > 10
    ) {
      errors.password = "Password cannot be more than 10 characters";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate(userInfo));
      setIsSubmit(true);
      await axios.post("/auth/set-employee-password", {
        password: userInfo.password,
        token: setPasswordToken,
        employeeID: userId,
      });
      setPopupMsg("password has been set for this User!");
    } catch (err) {
      console.log(err);
    }
    if (isSubmit) {
      navigate("/securityquestion");
    }
  };
  return (
    <div>
      <section>
        <div className="splash-container">
          <div className="bg-success text-light mx-auto">{popupMsg}</div>
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
                Set New Password to Login
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

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    id="password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.password}</p>
                </div>
                {/* {formErrors.pass} */}
                <button type="submit" className="btn btn-dark">
                  Set Password
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
