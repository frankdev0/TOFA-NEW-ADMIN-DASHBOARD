import React, { useEffect, useState } from "react";
// import { useFetch } from "../../../useFetch";
import { axios } from "../../components/baseUrl";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./products.css";

// import {datatabless} from '../../website-settings/commodityInsight/DummyData';

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [viewProduct, setViewProduct] = useState([]);

  const getData = async () => {
    try {
      axios.get("/product").then((response) => {
        console.log(response.data);
        setProduct(response.data.data);
      });
    } catch (error) {
      console.log(error.response.data.erros);
    }
  };

  const setData = (
    id,
    productName,
    maxDuration,
    parentCategory,
    supplyCapacity,
    category,
    minDuration,
    subCategory,
    unitForMinOrder,
    unitForSupplyCapacity,
    productDescription
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("productName", productName);
    localStorage.setItem("minPricePerUnit", minDuration);
    localStorage.setItem("maxPricePerUnit", maxDuration);
    localStorage.setItem("supplyCapacity", supplyCapacity);
    localStorage.setItem("unitForSupplyCapacity", unitForSupplyCapacity);
    localStorage.setItem("category", category);
    localStorage.setItem("parentCategory", parentCategory);
    localStorage.setItem("subCategory", subCategory);
    localStorage.setItem("unitForMinOrder", unitForMinOrder);
    localStorage.setItem("productDescription", productDescription);
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleDelete = (productID) => {
  //   axios.delete(`/product/${productID}`).then((response) => {
  //     setViewProduct(response.data.data)
  //   });
  // };

  const showDetails = (productID) => {
    axios.get(`/product/${productID}`).then((response) => {
      setViewProduct(response.data.data);
    });
  };

  useEffect(() => {
    //initialize datatable
    $(document).ready(function() {
      setTimeout(function() {
        $("#example").DataTable();
      }, 1000);
    });
  }, []);

  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        <Navbar />
        <Sidebar />
        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            {/* <!-- pageheader --> */}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="page-header" style={{ textAlign: "left" }}>
                  <h2 className="pageheader-title">Product Overview</h2>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                align="right"
              >
                <a href="/createproduct" className="btn btn-dark">
                  Create Products
                </a>
              </div>
            </div>
            {/* <!-- end pageheader --> */}

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-header" style={{ textAlign: "left" }}>
                    <h5 className="mb-0 font-bold">All Orders</h5>

                    {/* <p>This example shows DataTables and the Buttons extension being used with the Bootstrap 4 framework providing the styling.</p> */}
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
                              {/* <th>ID</th> */}
                              <th>Product ID</th>

                              <th>Product Name</th>
                              <th>Min Price Per Unit</th>
                              <th>maxPricePerUnit</th>
                            
                              <th>supplyCapacity</th>

                              <th>minDuration</th>
                              <th>maxDuration</th>
                           
                              <th>Actionn-two</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.map((item, index) => {
                              return (
                                <tr key={item.id}>
                                  {/* <td>{item.id}</td> */}
                                  <td>{index +1}</td>
                                  <td>{item.productName}</td>
                                  <td>{item.minPricePerUnit}</td>
                                  <td>{item.maxPricePerUnit}</td>
                           
                                  <td>{item.supplyCapacity}</td>
                                  <td>{item.minDuration}</td>
                                  <td>{item.maxDuration}</td>
                                
                                  <td>
                                    

                                  
                          {/* <button
                            className="btn btn-success"
                            onClick={() =>
                              setData(
                                item.id,
                                item.productName,
                                item.parentCategory,
                                item.minDuration,
                                item.maxDuration,
                                item.supplyCapacity,
                                item.category,
                                item.unitForSupplyCapacity,
                                item.subCategory,
                                item.unitForMinOrder,
                                item.productDescription, 
                              )
                            }
                          >
                            Edit
                          </button> */}
                          <Link to={`/editproduct/${item.id}`}> 
                          <button>
                            Edit
                          </button>
                          </Link>
                                    

                                    {/* <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-dismiss="modal"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      delete
                                    </button> */}

                                    <button
                                      onClick={(e) => showDetails(item.id)}
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      view
                                    </button>

                                    <div
                                      className="modal fade"
                                      id="exampleModal"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h3
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Product Details Management
                                            </h3>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            <div className="d-flex top-ctn" style={{width:"100%"}}>
                                              <div className="top-left-ctn modal-body" style={{width:"50%"}}>
                                                <h4>Featured Product Image: </h4>
                                                <div className="product-img-ctn" style={{width:"100%"}}>
                                                  <div className="product-img-ctn-featured" style={{width:"100%"}}>
                                                    <img src={viewProduct.productImages && viewProduct.productImages.filter(image => image.isMain == true)[0].image} alt='' style={{width:"100%", height:"auto"}} />
                                                  </div>
                                                  <div className="product-img-ctn-other" style={{width:"100%"}} >
                                                    {viewProduct.productImages && viewProduct.productImages.filter(image => image.isMain == false).map((image, index) => <img key={index} src={image.image} alt='' style={{width:"100px", height:"100px", margin: "5px", objectFit: "cover"}}/>)}
                                                  </div>
                                                </div>
                                                <Link to={`/editproduct/${item.id}`}> 
                                                  <h5 style={{color:"#DC4D04"}}>
                                                    Update images
                                                  </h5>
                                                </Link>
                                              </div>
                                              <div className="top-right-ctn modal-body" style={{width:"50%"}}>
                                                <h4> Product Details</h4>
                                                <div className="top-right-ctn-body" style={{width:"100%",  border: "1px solid #000000"}}> 
                                                  <div className="top-right-ctn-body top-cont d-flex" style={{width: "100%",}}> 
                                                    <div className="top-right-ctn-body top-cont-left" style={{width:"50%", border: "1px solid #DDDDDD"}}> 
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Product Name: </h6>
                                                        {viewProduct.productName}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Subcategory: </h6>
                                                        {viewProduct.subCategory}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Min price: </h6>
                                                        {viewProduct.minPricePerUnit}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Category: </h6>
                                                        {viewProduct.subCategory}
                                                      </div>
                                                    </div>
                                                    <div className="top-right-ctn-body top-cont-right" style={{width:"50%", border: "1px solid #DDDDDD"}}> 
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Supply Capacity: </h6>
                                                        {viewProduct.supplyCapacity}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Min Duration: </h6>
                                                        {viewProduct.minDuration}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Category: </h6>
                                                        {viewProduct.subCategory}
                                                      </div>
                                                      <div className="modal-body">
                                                        <h6 style={{color: "rgba(0, 0, 0, 0.62)"}}> Subcategory: </h6>
                                                        {viewProduct.subCategory}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="top-right-ctn-body bottom-cont"> 
                                                    <h6 className="modal-body" style={{color: "rgba(0, 0, 0, 0.62)"}}> Cost of product: </h6>
                                                    <div className="d-flex">
                                                      <div className="modal-body">
                                                        Maximum Price Per Unit: <br/>
                                                        {viewProduct.maxPricePerUnit}
                                                      </div>
                                                      <div className="modal-body">
                                                        Currency: <br/>
                                                        {viewProduct.currency}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <Link to={`/editproduct/${item.id}`}> 
                                                    <h5 style={{color:"#DC4D04"}}>
                                                      Update product details
                                                    </h5>
                                                </Link>
                                              </div>
                                            </div>
                                            <div className="bottom-ctn modal-body">
                                              <h4 >Product Information</h4>
                                              <div className="modal-body" style={{border: "1px solid #000000"}}>
                                                ToFa has developed partnerships with Vietnam’s top suppliers to provide high-quality cashew nuts to markets worldwide. Vietnam has been producing cashews throughout the country since the early 1980s. 
                                                Cashew nuts are grown in various regions in Vietnam, including Binh Phuoc, Dak Nong, Dong Nai, Binh Duong provinces. Particularly, Binh Phuoc province is known as the leading region for the growth of cashew nuts, constituting over 50% of the entire cashew nuts production in Vietnam. 

                                                Tridge can provide two types of cashew nuts for export: kernel and processed nuts. With kernel cashew nuts, there are various sizes ranging from W180 to W500. For processed nuts, salt-roasted cashew is most popular. Moreover, Tridge can provide organic cashew kernel, which is gaining popularity in the market. he cashew nuts in Vietnam are based on size, color, and degree of rupture.
                                              </div>
                                              <Link to={`/editproduct/${item.id}`}> 
                                                    <h5 style={{color:"#DC4D04"}}>
                                                      Update product information
                                                    </h5>
                                              </Link>
                                            </div>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
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

export default Products;
