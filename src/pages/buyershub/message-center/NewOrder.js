import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./message.css";

export const NewOrderModal = () => {
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  return (
    <div
      className="modal fade place-order-modal px-5"
      style={{ textAlign: "left" }}
      id="orderModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
                <form className="w-100">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Product Name</label>
                    <select
                      className="form-select selects"
                      aria-label="Default select example"
                    >
                      <option selected className="options">
                        Select Product
                      </option>
                      <option value="1" className="options">
                        Cashew
                      </option>
                      <option value="2" className="options">
                        Cocoa
                      </option>
                      <option value="3" className="options">
                        Paddy Rice
                      </option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label htmlFor="exampleInputEmail1">
                      Product Requirements
                    </label>
                    <textarea
                      class="form-control"
                      id=""
                      rows="3"
                      placeholder="Enter product requirements"
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="exampleInputPassword1">Quantity</label>
                      <div className="custom-input form-control">
                        <div className="row">
                          <div className="col-lg-7 col">
                            <input
                              type="number"
                              className="form-control custom-style"
                              id=""
                              placeholder="Enter quantity"
                            />
                          </div>
                          <div className="col-lg-5 col">
                            <div className="form-unit">metric tons</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label for="exampleInputPassword1">Shipping Terms</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected className="form-control">
                          Select shipping terms
                        </option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="CFR">CFR</option>
                        <option value="LOCAL">Local Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label for="exampleInputPassword1">Payment Terms</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select payment terms</option>
                        <option value="LC">LC</option>
                        <option value="DP">DP</option>
                        <option value="CAD">CAD</option>
                        <option value="TT">TT</option>
                      </select>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label for="exampleInputPassword1">
                        Destination Country
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Country of Origin</option>
                        <option value="1">India</option>
                        <option value="2">China</option>
                        <option value="3">Bangladesh</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label for="exampleInputPassword1">
                        Destination Country
                      </label>
                      <Select
                        className="form-control custom-style"
                        options={options}
                        name="country"
                        value={country}
                        onChange={setCountry}
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label for="exampleInputPassword1">
                        Destination Port
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Enter Destination Port"
                      />
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-secondary order-btn">
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
