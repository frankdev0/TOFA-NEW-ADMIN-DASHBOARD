import React, { useContext, useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
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

  const [customError, setCustomError] = useState("");
  const [loading, setLoading] = useState(false);

  // const { currentUser } = useContext(AuthContext);
  // console.log("This is the currently signed in user", currentUser);

  //   const {error, loading, data} = useFetch("/auth/signin")

  //   if(error) console.log(error)

  //   if (loading) return <h1>LOADING....</h1>

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
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setLoading(true);
      const { data } = await axios.post("/auth/signin-employee", {
        email: userInfo.email,
        password: userInfo.password,
      });
      setLoading(true);

      if (data) {
        navigate("/overview");
      }
      // dispatch({ type: "LOGIN", payload: data });
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
    <div className="login">
      <section>
        {/* <!-- ============================================================== -->
    <!-- login page  -->
    <!-- ============================================================== --> */}
        <div className="splash-container">
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
                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </div>
                {/* {formErrors.pass} */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block"
                  disabled={loading}
                >
                  {loading && <i class="fa fa-spinner" aria-hidden="true"></i>}
                  Sign in
                </button>
              </form>
            </div>
            <div className="card-footer bg-white p-0  ">
              <div className="card-footer-item card-footer-item-bordered">
                <a href="signup" className="footer-link">
                  Create An Account
                </a>
              </div>
              <div className="card-footer-item card-footer-item-bordered">
                <a href="link" className="footer-link">
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ============================================================== -->
    <!-- end login page  -->
    <!-- ============================================================== -->
    <!-- Optional JavaScript -->
    <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script> */}
      </section>
    </div>
  );
};

export default Login;
