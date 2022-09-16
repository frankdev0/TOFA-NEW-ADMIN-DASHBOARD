import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";

const SecurityQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState({
    question1: "",
    question2: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");

  const handleChange = (e) => {
    setQuestions({ ...questions, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ questions });
      const { data } = await axios.post("/auth/signin", {
        question: questions.question1,
        question2: questions.question2,
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
                Answer the Following Questions to Confirm Your Account
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <select className="form-control bg-light">
                    {" "}
                    ....Please Select a security question
                    <option className="bg-light">
                      What is the name of your first pet
                    </option>
                    <option>What is the name of your bestfriend</option>
                    <option>What is the name of your favorite pet</option>
                    <option>What was the name of your first girlfriend</option>
                  </select>
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
                    placeholder="Answer"
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <select className="form-control bg-light">
                    {" "}
                    ....Please Select a security question
                    <option className="bg-light">
                      What is the name of your first pet
                    </option>
                    <option>What is the name of your bestfriend</option>
                    <option>What is the name of your favorite pet</option>
                    <option>What was the name of your first girlfriend</option>
                  </select>
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
                    placeholder="Answer"
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </div>
                {/* {formErrors.pass} */}
                <button type="submit" className="btn btn-dark btn-lg btn-block">
                  Submit
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

export default SecurityQuestion;
