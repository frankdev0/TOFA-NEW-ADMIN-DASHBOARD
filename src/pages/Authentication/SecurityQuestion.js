import React, { useState } from "react";
import logo from "../../assets/logos.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../components/baseUrl";
import swal from "sweetalert";

const SecurityQuestion = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");
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
    if (values.question_one === values.question_two) {
      errors.answer_one = "Please select different security questions";
    }
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //   }
  // }, [formErrors]);

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
      const res = await axiosInstance.post("/auth/security-questions", {
        securityQuestions: securityQuestions,
      });
      setIsSubmit(true);

      console.log(res.data);
      if (res.status === 201) {
        swal({
          title: "Account Activated",
          text: "You've Successfully Set Security Question For this Account",
          icon: "success",
          button: "ok",
        });
        navigate("/overview");
      }
    } catch (err) {
      if (err) {
        console.log("error message", err);
        // setFormErrors(
        //   err.response.data.errors.reduce(function(obj, err) {
        //     obj[err.field] = err.message;
        //     return obj;
        //   }, {})
        // );
      }
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
                  {/* <p className="text-danger">{formErrors.answer}</p> */}
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
                  {formErrors && <p className="text-danger">{formErrors}</p>}
                </div>

                {isSubmit ? (
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
                    Submit
                  </button>
                )}
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
