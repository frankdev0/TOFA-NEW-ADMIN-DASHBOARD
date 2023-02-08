import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { axios } from "../components/baseUrl";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/employee/forgot-password`,
        email
      );
      setLoading(false);
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
      swal({
        title: "Password Link",
        text: `A Password reset link has been sent to your email`,
        icon: "success",
        button: "ok",
      });
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.data.errors[0].message) {
        toast.error(`${err.response.data.errors[0].message}`, {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      } else {
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
        <ToastContainer />
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
                    className="btn btn-dark btn-lg btn-block"
                  >
                    Reset Password
                  </button>
                )}
              </form>
            </div>
            <div className="card-footer bg-white p-0  ">
              <div className="card-footer-item card-footer-item-bordered">
                Have an account?
                <a href="/" className="mx-1 footer-link">
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
