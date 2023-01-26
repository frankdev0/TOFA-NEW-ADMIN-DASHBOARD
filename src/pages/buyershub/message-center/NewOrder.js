import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { axios } from "../../components/baseUrl";
import "./message.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { africanCountryData } from "../products/africanCountries";

export const NewOrderModal = ({ buyerId, handleSendMsg }) => {
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [orderAlert, setOrderAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
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

  const initialState = {
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
  };
  const options = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();

  const handleOrder = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const getProductInfo = async () => {
    try {
      const { data } = await axios.get("/product");
      setProducts(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log("productsId", productsId);
    console.log("countryOfOrigin", countryOfOrigin);
    try {
      e.preventDefault();
      const foreignOrderInfo = {
        productID: productsId,
        quantity: orderDetails.quantity,
        buyerID: buyerId,
        country: country.label,
        countryOfOrigin: countryOfOrigin,
        shipping: orderDetails.shipping,
        paymentTerm: orderDetails.paymentTerm,
        cost: orderDetails.cost,
        port: orderDetails.port,
        productRequirement: orderDetails.productRequirement,
      };
      const localOrderInfo = {
        productID: productsId,
        quantity: orderDetails.quantity,
        buyerID: buyerId,
        country: country.label,
        countryOfOrigin: countryOfOrigin,
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
        setLoading(false);
        setOrderDetails(initialState);
        setCountry({ label: "" });
        setProductsId([]);
        setCountryOfOrigin("");
        setOrderAlert(JSON.stringify(result.data));
        console.log(result);
        console.log(localOrderInfo);
      } else {
        console.log("these are values for local", localOrderInfo);
        const { data: result } = await axios.post(
          "/order/local",
          localOrderInfo
        );
        setLoading(false);
        setOrderDetails(initialState);
        setCountryOfOrigin("");
        setCountry({ label: "" });
        setProductsId([]);
        setOrderAlert(JSON.stringify(result.data));
        console.log(result);
      }

      setTimeout(() => {
        navigate("/message");
      }, 3000);
      toast.success("SUCCESSFULLY CREATED ORDER", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
    } catch (err) {
      setLoading(false);
      setOrderDetails(initialState);
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
                      onChange={(e) => setProductsId(e.target.value)}
                      name="productID"
                    >
                      <option>...select product</option>
                      {products &&
                        products.map((product) => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.productName}
                            </option>
                          );
                        })}
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
                      value={orderDetails.productRequirement}
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
                              value={orderDetails.quantity}
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
                        onChange={(e) => setCountryOfOrigin(e.target.value)}
                      >
                        <option>...Select Country of Origin</option>
                        {Object.entries(africanCountryData).map(
                          (country, index) => {
                            return (
                              <option key={index} value={`${country[1]}`}>
                                {country[1]}
                              </option>
                            );
                          }
                        )}
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
                    {loading ? (
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg btn-block px-5"
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    ) : (
                      <button className="btn btn-dark start-btn py-2">
                        Submit Order Request
                      </button>
                    )}
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
