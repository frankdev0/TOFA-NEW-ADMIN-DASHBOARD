import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { axios } from "../../components/baseUrl";
import "./message.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export const NewOrderModal = ({ buyerId, handleSendMsg }) => {
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [formErrors, setFormErrors] = useState("");
  const [orderAlert, setOrderAlert] = useState("");
  const [customError, setCustomError] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    quantity: "",
    country: "",
    countryOfOrigin: "",
    shipping: "",
    paymentTerm: "",
    cost: "",
    port: "",
    address: "",
    productRequirement: "",
    specification: "",
    grade: "",
  });
  const options = useMemo(() => countryList().getData(), []);

  const productId = useParams();
  console.log(productId);

  const navigate = useNavigate();

  const handleOrder = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const getProductInfo = async () => {
    try {
      const { data } = await axios.get("/product");
      const products = data.data.map((item) => item.productName);
      setProducts(products);
      const id = data.data.map((item) => item.id);
      setProductsId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  // const totalCost = priceSelected * orderDetails.quantity;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const foreignOrderInfo = {
        quantity: orderDetails.quantity,
        buyerID: buyerId,
        country: country.label,
        countryOfOrigin: orderDetails.countryOfOrigin,
        shipping: orderDetails.shipping,
        paymentTerm: orderDetails.paymentTerm,
        cost: orderDetails.cost,
        port: orderDetails.port,
        productRequirement: orderDetails.productRequirement,
      };
      const localOrderInfo = {
        quantity: orderDetails.quantity,
        buyerID: buyerId,
        country: country.label,
        countryOfOrigin: orderDetails.countryOfOrigin,
        shipping: orderDetails.shipping,
        paymentTerm: orderDetails.paymentTerm,
        cost: orderDetails.cost,
        address: orderDetails.address,
        productRequirement: orderDetails.productRequirement,
        specification: orderDetails.productRequirement,
        grade: "W320",
      };
      if (!orderDetails.address) {
        console.log("these are values for foreign", foreignOrderInfo);
        const { data: result } = await axios.post(
          "/order/foreign",
          foreignOrderInfo
        );
        setOrderAlert(
          `Your order has been created. Proceed to "My Order" to approve`
        );
        console.log(result);
        console.log(localOrderInfo);
      } else {
        console.log("these are values for local", localOrderInfo);
        const { data: result } = await axios.post(
          "/order/local",
          localOrderInfo
        );
        setOrderAlert(
          `Your order has been created. Proceed to "My Order" to approve`
        );
        console.log(result);
      }

      // setTimeout(() => {
      //   navigate(-1);
      // }, 3000);
      // toast.success("SUCCESSFULLY CREATED ORDER", {
      //   position: "top-right",
      //   autoClose: 4000,
      //   pauseHover: true,
      //   draggable: true,
      // });
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
  };

  useEffect(() => {
    if (orderAlert) {
      return handleSendMsg(orderAlert, buyerId);
    }
  }, [orderAlert]);

  return (
    <div
      className="modal fade place-order-modal px-5"
      style={{ textAlign: "left" }}
      id="orderModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Order Request
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12">
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Product Name</label>

                    <select
                      className="form-select selects"
                      aria-label="Default select example"
                      onChange={handleOrder}
                      name=""
                    >
                      {/* {products &&
                        products.map((item, id) => { */}
                      {/* return ( */}
                      <option>...select product</option>
                      <option value="1" className="options">
                        Cocoa
                      </option>
                      <option>Cashew</option>
                      <option>Maize</option>
                      {/* );
                        })} */}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">
                      Product Requirements
                    </label>
                    <textarea
                      className="form-control"
                      style={{ borderRadius: "0.375rem" }}
                      name="productRequirement"
                      onChange={handleOrder}
                      id=""
                      rows="3"
                      placeholder="Enter product requirements"
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">Quantity</label>
                      <div
                        className="custom-input form-control"
                        style={{ borderRadius: "0.45rem" }}
                      >
                        <div className="row">
                          <div className="col-lg-7 col">
                            <input
                              type="number"
                              className="form-control custom-style"
                              id=""
                              placeholder="Enter quantity"
                              name="quantity"
                              onChange={handleOrder}
                            />
                          </div>
                          <div className="col-lg-5 col">
                            <div className="form-unit">metric tons</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">
                        Shipping Terms
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleOrder}
                        name="shipping"
                        value={orderDetails.shipping}
                      >
                        <option>Select shipping terms</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="CFR">CFR</option>
                        <option value="LOCAL">Local Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">
                        Payment Terms
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="paymentTerm"
                        value={orderDetails.paymentTerm}
                        onChange={handleOrder}
                      >
                        <option defaultValue="Select payment terms">
                          Select payment terms
                        </option>
                        <option value="LC">LC</option>
                        <option value="DP">DP</option>
                        <option value="CAD">CAD</option>
                        <option value="TT">TT</option>
                      </select>
                    </div>

                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">
                        Country Of Origin
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="countryOfOrigin"
                        value={orderDetails.countryOfOrigin}
                        onChange={handleOrder}
                      >
                        <option defaultValue="Country of Origin">
                          Country of Origin
                        </option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="Bangladesh">Bangladesh</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">
                        Destination Country
                      </label>
                      <Select
                        className="custom-country-list"
                        options={options}
                        name="country"
                        value={country}
                        onChange={setCountry}
                      />
                    </div>
                    {orderDetails.shipping === "LOCAL" ? (
                      <div className="col-lg-6 mb-3">
                        <label htmlFor="exampleInputPassword1">Address</label>
                        <input
                          type="text"
                          className="ports form-control"
                          id=""
                          placeholder="Enter Address"
                          name="address"
                          value={orderDetails.address}
                          onChange={handleOrder}
                        />
                      </div>
                    ) : (
                      <div className="col-lg-6 mb-3">
                        <label htmlFor="exampleInputPassword1">
                          Destination Port
                        </label>
                        <input
                          type="text"
                          className="ports form-control"
                          id=""
                          placeholder="Enter Destination Port"
                          name="port"
                          value={orderDetails.port}
                          onChange={handleOrder}
                        />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">Price</label>
                      <input
                        type="number"
                        className="ports form-control"
                        id=""
                        placeholder="Enter Price"
                        name="cost"
                        value={orderDetails.cost}
                        onChange={handleOrder}
                      />
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-dark start-btn py-2">
                      Submit Order Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
