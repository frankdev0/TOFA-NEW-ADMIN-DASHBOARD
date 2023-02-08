import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../../utils/contexts/AuthContext";
// import { useFetch } from "../../useFetch";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ userInfo });
      setLoading(true);
      const { data } = await axios.post(
        "http://ec2-18-221-181-52.us-east-2.compute.amazonaws.com:8081/api/v2/auth/signin-employee",
        {
          email: userInfo.email,
          password: userInfo.password,
        }
      );
      setLoading(true);
      console.log("new data", data);

      if (data) {
        navigate("/overview");
      }
      // dispatch({ type: "LOGIN", payload: data });
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (!err.response.data.errors) {
        return toast.error(`Network Error, Try Again Later.`, {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      }
      if (err.response.data.errors[0].field) {
        setFormErrors(
          err.response.data.errors.reduce(function(obj, err) {
            obj[err.field] = err.message;
            return obj;
          }, {})
        );
      } else {
        console.log(err.response.data.errors[0].message);
        if (err.response.data.errors[0].message) {
          toast.error(`${err.response.data.errors[0].message}`, {
            position: "top-right",
            autoClose: 4000,
            pauseHover: true,
            draggable: true,
          });
        }
      }
    }
  };
  return (
    <div className="login">
      <section>
        {/* <!-- ============================================================== -->
    <!-- login page  -->
    <!-- ============================================================== --> */}
        <div className="splash-container">
          <ToastContainer />
          <div className="card ">
            <div className="card-header text-center">
              <a href="../index.html">
                <img
                  width="100px"
                  className="logo-img mb-3"
                  src={logo}
                  alt="logo"
                />
              </a>
              <span className="splash-description">
                Login below to continue
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-field form-group">
                  <input
                    className="form-control form-control-lg"
                    id="username"
                    type="text"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-danger">{formErrors.email}</p>
                )}
                <div className="input-field form-group">
                  <input
                    className="form-control form-control-lg"
                    id="password"
                    type={type}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <span>
                    <Icon onClick={handleToggle} icon={icon} size={15} />{" "}
                  </span>
                </div>
                {formErrors.password && (
                  <p className="text-danger">{formErrors.password}</p>
                )}

                {loading ? (
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block px-4"
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block px-4"
                  >
                    Login
                  </button>
                )}
              </form>
            </div>
            <div className="card-footer bg-white p-0  ">
              <div className="card-footer-item card-footer-item-bordered">
                <a href="signup" className="footer-link">
                  Create An Account
                </a>
              </div>
              <div className="card-footer-item card-footer-item-bordered">
                <a href="/forgot-password" className="footer-link">
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 
    <!-- end login page  --> */}
      </section>
    </div>
  );
};

export default Login;
