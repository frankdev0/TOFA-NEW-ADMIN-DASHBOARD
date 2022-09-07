import React, {useEffect, useState } from "react";
// import { useFetch } from '../../../useFetch'
import { axios } from '../../components/baseUrl'
import {applicantDatatabless} from '../Dummydata';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Applicants = () => {


  const [applicants, setApplicants] = useState([]);
  const [applicantView, setApplicantView] = useState([]);

  const getData = async () => {
    try {
      axios.get("/tofa-academy").then((response) => {
        console.log(response.data);
        setApplicants(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  const showDetails = (applicantID) => { 
    axios.get(`/tofa-academy/${applicantID}`).then((response) => {
      setApplicantView(response.data.data)
    });
};

  //  const {data, loading, error} = useFetch("/order")

  //  if (loading) return <h1>LOADING ....</h1>

  //  if (error) console.log(error)

  // const handleDelete = (applicantID) => {
  //   axios.delete(`/product/${applicantID}`).then(() => {

  //   })
  // }

  useEffect(() => {
    getData()
  }, [])

  useEffect(()=>{
    //initialize datatable
$(document).ready(function () {
    setTimeout(function(){
    $('#example').DataTable();
     } ,1000);
});
},[])

  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar/>
        <Sidebar/>
        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            {/* <!-- pageheader --> */}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="page-header" style={{ textAlign: "left" }}>
                  <h2 className="pageheader-title">Applicants Overview</h2>
                </div>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">All Applicants</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        id="example wrapper"
                        className="dataTables_wrapper dt_bootstrap4"
                      >
                      </div>
                      <div className="container">
                        <table
                          id="example"
                          className="table table-hover table-bordered"
                          style={{ width: "100%", textAlign: "left" }}
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Full Name</th>
                              <th>Country</th>
                              <th>phoneNumber</th>
                              <th>productTraded</th>
                              <th>Age</th>
                              <th>Email</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicants.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  <td>{index +1}</td>
                                  <td>{item.firstName} {item.lastName}</td>
                                  <td>{item.country}</td>
                                  <td>{item.phoneNumber}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.age}</td>
                                  <td>{item.email}</td>
                                  <td>
                                  <div className="text-center">
                                    <button
                                      onClick={(e) => showDetails(item.id)}
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      view
                                    </button>
                                    </div>

                                    <div
                                      className="modal fade modal-width"
                                      id="exampleModal"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h3
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Application Details Management
                                            </h3>
                                            <button
                                              type="button"
                                              className="btn-close text-danger"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                             
                                            ></button>
                                          </div>

                                          <div className="modal-body"> 
                                            <div className="d-flex top-ctn">
                                              <div className="modal-body" >
                                                <img src={applicantView.image} alt='applicant' style={{width: "125px", height: "125px", borderRadius: "50%"}}/>
                                              </div>
                                              <div className="modal-body" >
                                                <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> First name: </h6>
                                                {applicantView.firstName}
                                              </div>
                                              <div className="modal-body" >
                                                <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Last name: </h6>
                                                {applicantView.lastName}
                                              </div>
                                              <div className="modal-body" >
                                                <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Email: </h6>
                                                {applicantView.email}
                                              </div>
                                            </div>
                                            <div className=" d-flex bottom-ctn" style={{border: "1px solid #000000", width: "100%"}}>
                                              <div className="bottom-ctn-left" style={{width:"50%", border: "1px solid #DDDDDD"}}>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Country: </h6>
                                                  {applicantView.country}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> State: </h6>
                                                  {applicantView.state}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Address: </h6>
                                                  {applicantView.address}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Gender: </h6>
                                                  {applicantView.gender}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Age: </h6>
                                                  {applicantView.age}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Phone no: </h6>
                                                  {applicantView.phoneNumber}
                                                </div>
                                              </div>
                                              <div className="bottom-ctn-right" style={{width:"50%", border: "1px solid #DDDDDD"}}>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Language(s): </h6>
                                                  {applicantView.language}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Do you currently trade with any product?</h6>
                                                  {/* {applicantView.phoneNumber} */} Yes
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> How would you attend the training? </h6>
                                                  {/* {applicantView.phoneNumber} */} Online
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> State the products you trade on: </h6>
                                                  {applicantView.products}{" "}
                                                </div>
                                                <div className="modal-body" >
                                                  <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Applicant’s Video</h6>
                                                  {applicantView.link}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                         
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-dark"
                                              data-bs-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                     </td>
                                  
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Applicants;
