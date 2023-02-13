import React, { useState, useEffect } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const { userId, setPasswordToken } = useParams();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    if (type === "text") {
      setType("password");
      setIcon(eyeOff);
    } else {
      setType("text");
      setIcon(eye);
    }
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
      setIsSubmit(false);
      const result = await axiosInstance.post("/auth/set-employee-password", {
        password: userInfo.password,
        token: setPasswordToken,
        employeeID: userId,
      });
      setIsSubmit(true);
      if (result.status === 201) {
        toast.success("PASSWORD HAS BEEN SET FOR THIS USER", {
          position: "top-right",
          autoClose: 2000,
          pauseHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/securityquestion");
        }, 3000);
      }
    } catch (err) {
      if (err.response.status === 400) {
        setTokenError("Invalid token");
        console.log("error message", err.response);
      }

      if (err.response.status === 400) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      }
    }
  };
  return (
    <div>
      <section>
        <ToastContainer />
        <div className="splash-container">
          <div className="bg-success text-light mx-auto my-4 px-5"></div>
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
                <div className="input-field form-group">
                  <input
                    className="form-control form-control-lg"
                    type={type}
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <span>
                    <Icon onClick={handleToggle} icon={icon} size={15} />{" "}
                  </span>
                </div>

                <div className="input-field form-group">
                  <input
                    className="form-control form-control-lg"
                    id="password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-danger">{formErrors.password}</p>
                <p className="text-danger">{tokenError}</p>
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
