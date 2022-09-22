import React, { useState, useEffect } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axios } from "../components/baseUrl";

const SecurityQuestion = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState({
    question_one: "",
    question_two: "",
    answer_one: "",
    answer_two: "",
  });

  const handleChange = (e) => {
    setSecurityQuestion({
      ...securityQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.answer_one) {
      errors.answer_one = "Please answer the security question";
    }
    if (!values.answer_two) {
      errors.answer_two = "Please answer the security question";
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate(securityQuestion));
      setIsSubmit(true);
      const securityQuestions = [
        {
          question: securityQuestion.question_one,
          answer: securityQuestion.answer_one,
        },
        {
          question: securityQuestion.question_two,
          answer: securityQuestion.answer_two,
        },
      ];
      console.log("for security question", securityQuestions);
      const res = await axios.post("/auth/security-questions", {
        securityQuestions: securityQuestions,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    if (isSubmit) {
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
                  <select
                    className="form-control bg-light"
                    onChange={handleChange}
                    name="question_one"
                  >
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
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="answer_one"
                    placeholder="Answer"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.answer_one}</p>
                </div>
                <div className="form-group">
                  <select
                    className="form-control bg-light"
                    onChange={handleChange}
                    name="question_two"
                  >
                    ....Please Select a security question
                    <option className="bg-light">
                      What is the name of your first pet
                    </option>
                    <option>
                      What is the name of your bestfriend/girlfriend
                    </option>
                    <option>What is the name of your favorite pet</option>
                    <option>What was the name of your first girlfriend</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="answer_two"
                    placeholder="Answer"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.answer_two}</p>
                </div>

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
