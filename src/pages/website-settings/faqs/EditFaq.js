import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../../components/baseUrl";

import { useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const EditFaq = () => {
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
//   const [faqInfo, setFaqInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //   const [formErrors, setFormErrors] = useState({})
  //   const [customError, setCustomError] = useState("")

  const navigate = useNavigate();

  const { myFaqId } = useParams();
  console.log(myFaqId);

  const getInfo = async () => {
    try {
      const response = await axios.get(`/faq/${myFaqId}`);
    //   setFaqInfo(response.data.data);
      console.log(response.data.data);
      setId(response.data.data.id);
      setQuestion(response.data.data.question);
      setAnswer(response.data.data.answer);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  //   const faqID =

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data: result } = await axios.patch(`/faq/${id}`, {
        answer: answer,
        question: question,
      });


      toast.success("EDITED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 2000,
        pauseHover: true,
        draggable: true,
      });
      console.log(result);
      // navigate("/faq");
    } catch (error) {
      if (error) {
        toast.error("FAILED TRY AGAIN", {
          position: "top-right",
          autoClose: 4000,
          pauseHover: true,
          draggable: true,
        });
      }
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <>
        <div className="dashboard-main-wrapper">
          <Navbar />

          <Sidebar />

          <div className="dashboard-wrapper">
            <ToastContainer />
            <div className="container-fluid dashboard-content">
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="page-header">
                    <h2 className="pageheader-title">
                      Frequently Asked Questions
                    </h2>
                  </div>
                </div>
              </div>
              {/* <!-- end pageheader --> */}

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Edit FAQ</h5>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Question
                          </label>
                          <input
                            type="text"
                            name="question"
                            className="form-control"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                          />
                          {/* {formErrors.question && (<p className="text-danger">{formErrors.question}</p>)} */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            Answer
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            value={answer}
                            name="answer"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {/* {formErrors.answer && (<p className="text-danger">{formErrors.answer}</p>)} */}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end main wrapper --> */}
        </div>
        {/* <!-- end main wrapper --> */}
      </>
    </div>
  );
};

export default EditFaq;
