import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";
import swal from "sweetalert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        "/auth/employee/forgot-password",
        email
      );
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
      swal({
        title: "Password Link",
        text: `A Link has been Successfully sent to ${email}`,
        icon: "success",
        button: "ok",
      });
      console.log(data);
    } catch (err) {
      console.log(err);
      //   if (err.response.data.errors[0].field) {
      //     setFormErrors(
      //       err.response.data.errors.reduce(function(obj, err) {
      //         obj[err.field] = err.message;
      //         return obj;
      //       }, {})
      //     );
      //   } else {
      //     console.log(err.response.data.errors[0].message);
      //     setCustomError(err.response.data.errors[0].message);
      //     alert(customError);
      //   }
      // }
      // if (!formErrors.email || !formErrors.password) {
      //   navigate("/confirmpassword");
    }
  };
  return (
    <div className="login">
      <section>
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
              <span className="splash-description">Forgot Password</span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-danger">{formErrors.email}</p>
                )}

                <button type="submit" className="btn btn-dark btn-lg btn-block">
                  Reset Password
                </button>
              </form>
            </div>
            <div className="card-footer bg-white p-0  ">
              <div className="card-footer-item card-footer-item-bordered">
                Have an account?
                <a href="/login" className="mx-1 footer-link">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
