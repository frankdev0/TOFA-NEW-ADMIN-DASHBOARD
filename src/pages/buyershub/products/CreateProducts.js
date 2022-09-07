import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import DropFileInput from "../../components/DropFileInput";
// import OtherImages from "./OtherImages";

const CreateProducts = () => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    parentCategory: "",
    unitForMinOrder: "",
    supplyCapacity: "",
    unitForSupplyCapacity: "",
    minDuration: "",
    maxDuration: "",
    category: "",
    subCategory: "",
    specification: "",
    productDescription: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");
  // const [file, setFile] = useState({
  //   imageOne:"",
  //   imageTwo:""
  // })

  const handleProductChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const getSpecifications = () => {
    const keys = document.getElementsByClassName("specification-keys");
    const values = document.getElementsByClassName("specification-values");

    const specification = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i].value;
      const value = values[i].value;
      if (key && value) specification[key] = value;
    }
    return JSON.stringify(specification);
  };

  const getCountry = () => {
    const countries = document.getElementsByClassName("country-keys");
    const prices = document.getElementsByClassName("country-values");

    const country = [];
    // [{ countryName: string, price: string }]
    for (let i = 0; i < countries.length; i++) {
      const countryName = countries[i].value;
      const price = prices[i].value;
      if (countryName && price) country.push({ countryName, price });
    }
    return JSON.stringify(country);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const jsonData = {
        productName: productDetails.productName,
        currency: "NGN",
        parentCategory: productDetails.parentCategory,
        unitForMinOrder: productDetails.unitForMinOrder,
        unitForSupplyCapacity: productDetails.unitForSupplyCapacity,
        minDuration: productDetails.minDuration,
        maxDuration: productDetails.maxDuration,
        category: productDetails.category,
        subCategory: productDetails.subCategory,
        productDescription: productDetails.productDescription,
        supplyCapacity: productDetails.supplyCapacity,
        specification: getSpecifications(),
        countries: getCountry(),
      };

      const formData = new FormData();
      for (const property in jsonData) {
        formData.append(`${property}`, jsonData[property]);
      }

      for (let i = 0; i < e.target.otherImages.files.length; i++) {
        formData.append("otherImages", e.target.otherImages.files[i]);
      }
      formData.append("featuredImage", e.target.featuredImage.files[0]);

      const { data: result } = await axios.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("SUCCESSFULLY CREATED NEW PRODUCT", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
      console.log(result);
    } catch (err) {
      if (err.response.data.errors[0].field) {
        console.log(err.response.data.errors);
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

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    console.log(selectedFiles);
  };

  const [specification, setSpecification] = useState([{ Type: "", Color: "" }]);
  const [country, setCountry] = useState([{ countryName: "", price: "" }]);

  // const handleChangeInput = (index, event) => {
  //   const values = [...specification];
  //   const countryValues = [...country];
  //   values[index][event.target.value] = event.target.value;
  //   countryValues[index][event.target.value] = event.target.value;
  //   setSpecification(values);
  //   setCountry(countryValues);
  // };

  const handleAddFields = () => {
    setSpecification([...specification, { Type: "", Color: "" }]);
  };

  const handleAddCountry = () => {
    setCountry([...country, { countryName: "", price: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...specification];
    values.splice(index, 1);
    setSpecification(values);
  };

  const handleRemoveCountry = (index) => {
    const countryValues = [...country];
    countryValues.splice(index, 1);
    setCountry(countryValues);
  };
  return (
    <>
      {/* <!-- main wrapper --> */}
      <div className="dashboard-main-wrapper">
        {/* <!-- navbar --> */}
        <Navbar />

        {/* <!-- left sidebar --> */}
        <Sidebar />

        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
          <ToastContainer />
          <div>
            <form className="mx-5 my-5" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <h2> Create Products</h2>
                {/* <Link to="/commodityInsight">
                <button className="btn btn-primary m-3">Show Commodity</button>
              </Link> */}
                <div
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
                  align="right"
                >
                  <a href="/products" className="btn btn-dark">
                    Show Products
                  </a>
                </div>
              </div>

              <div className="row my-3" style={{ textAlign: "left" }}>
                <div className="col-4 ">
                  <label className="form-label">Product Name:</label>
                  <input
                    name="productName"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.productName && (
                    <p className="text-danger">{formErrors.productName}</p>
                  )}
                </div>

                <div className="col-4 ">
                  <label className="form-label">Parent Category</label>

                  <select
                    className="form-control"
                    name="parentCategory"
                    aria-describedby="Default select example"
                    onChange={handleProductChange}
                    placeholder="parent category"
                  >
                    <option>CONSTRUCTION_MATERIAL</option>
                    <option>FOOD_AND_BEVERAGE</option>
                    <option>APPAREL</option>
                    <option>HOME_AND_FURNITURE</option>
                    <option> BEAUTY_AND_PERSONAL_CARE</option>
                    <option>PACKAGING_AND_SUPPLY</option>
                    <option> MINERALS_AND_METALLURGY</option>
                    <option> AGRICULTURE</option>
                  </select>
                  {/* <input
                    name="parentCategory"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  /> */}
                  {formErrors.parentCategory && (
                    <p className="text-danger">{formErrors.parentCategory}</p>
                  )}
                </div>

                <div className="col-4 ">
                  <label className="form-label">Supply Capacity</label>
                  <input
                    type="number"
                    name="supplyCapacity"
                    className="form-control"
                    onChange={handleProductChange}
                  ></input>
                  {formErrors.supplyCapacity && (
                    <p className="text-danger">{formErrors.supplyCapacity}</p>
                  )}
                </div>

                {/* <div className="col-4 mb-3">
                  <label className="form-label">Currency</label>
                  <input
                    name="currency"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div> */}
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-4 mb-3">
                  <label className="form-label">Unit of Min order</label>
                  <input
                    name="unitForMinOrder"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.unitForMinOrder && (
                    <p className="text-danger">{formErrors.unitForMinOrder}</p>
                  )}
                </div>

                <div className="col-4  mb-3">
                  <label className="form-label">Unit of Supply Capacity</label>
                  <input
                    name="unitForSupplyCapacity"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.unitForSupplyCapacity && (
                    <p className="text-danger">
                      {formErrors.unitForSupplyCapacity}
                    </p>
                  )}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Min Duration</label>
                  <input
                    name="minDuration"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.minDuration && (
                    <p className="text-danger">{formErrors.minDuration}</p>
                  )}
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-4  mb-3">
                  <label className="form-label">Max Duration</label>
                  <input
                    name="maxDuration"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.maxDuration && (
                    <p className="text-danger">{formErrors.maxDuration}</p>
                  )}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Category</label>
                  <input
                    name="category"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.category && (
                    <p className="text-danger">{formErrors.category}</p>
                  )}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Sub Category</label>
                  <input
                    name="subCategory"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.subCategory && (
                    <p className="text-danger">{formErrors.subCategory}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6" style={{ textAlign: "left" }}>
                  <label className="form-label">Specification</label>
                  {specification.map((info, index) => (
                    <div key={index} className="root my-2">
                      <input
                        type="text"
                        name="Type"
                        value={specification.Type}
                        placeholder="type"
                        className="mx-1 form-control specification-keys"
                      />

                      <input
                        type="text"
                        name="Color"
                        value={specification.Color}
                        variant="filled"
                        placeholder="value"
                        className="mx-1 form-control specification-values"
                      />

                      <div className="d-flex align-items-center">
                        <i
                          className="fa-solid fa-plus mx-1 "
                          onClick={() => handleAddFields()}
                        ></i>
                        <i
                          className="fa-solid fa-minus mx-1"
                          onClick={() => handleRemoveFields(index)}
                        ></i>
                      </div>
                    </div>
                  ))}
                  {formErrors.specification && (
                    <p className="text-danger">{formErrors.specification}</p>
                  )}
                </div>

                <div className="col-6">
                  <label className="form-label">Country</label>
                  {country.map((info, index) => (
                    <div key={index} className="root my-2">
                      <input
                        type="text"
                        name="countryName"
                        value={country.countryName}
                        variant="filled"
                        placeholder="country name"
                        className="mx-1 form-control country-keys"
                      />

                      <input
                        type="text"
                        name="price"
                        value={country.price}
                        variant="filled"
                        placeholder="price"
                        className="mx-1 form-control country-values"
                      />

                      <div className="d-flex align-items-center">
                        <i
                          className="fa-solid fa-plus mx-1 "
                          onClick={() => handleAddCountry()}
                        ></i>
                        <i
                          className="fa-solid fa-minus mx-1"
                          onClick={() => handleRemoveCountry(index)}
                        ></i>
                      </div>
                    </div>
                  ))}
                  {formErrors.country && (
                    <p className="text-danger">{formErrors.country}</p>
                  )}
                </div>
              </div>

              <div className="mb-3" style={{ textAlign: "left" }}>
                <label className="form-label">Description</label>
                <textarea
                  name="productDescription"
                  type="text"
                  className="form-control"
                  onChange={handleProductChange}
                />
                {formErrors.productDescription && (
                  <p className="text-danger">{formErrors.productDescription}</p>
                )}
              </div>

              <div className="row">
                <div className="col-6 box">
                  <h3 className="header">Featured Images</h3>

                  {/* <DropFileInput
                      onFileChange={(files) => onFileChange(files)}
                    /> */}
                  <input type="file" name="featuredImage" />
                </div>
                <div className="col-6 mx-auto">
                  <div className="mb-3" style={{ textAlign: "left" }}>
                    <label className="form-label d-block">Other Images</label>
                    <input
                      type="file"
                      name="otherImages"
                      accept="image/*"
                      multiple
                      onChange={onSelectFile}
                    />

                    <div className="iamges d-flex">
                      {selectedImages &&
                        selectedImages.map((image, index) => {
                          return (
                            <div
                              key={image}
                              className="image"
                              style={{ position: "relative" }}
                            >
                              <img src={image} alt="" />
                              {/* <button
                            onClick={() =>
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          >
                            delete image
                          </button> */}
                              <div
                                className="bin-icon"
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "0",
                                  color: "red",
                                }}
                              >
                                <IconButton
                                  className="text-danger"
                                  aria-label="delete"
                                  size="small"
                                  onClick={() =>
                                    setSelectedImages(
                                      selectedImages.filter((e) => e !== image)
                                    )
                                  }
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              </div>
                            </div>
                          );
                        })}
                      {console.log(selectedImages)}
                    </div>
                  </div>
                </div>
              </div>

              {/* <input
                className="productInput"
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}

              <div style={{ textAlign: "left" }}>
                <button className="btn btn-dark">Submit</button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default CreateProducts;
