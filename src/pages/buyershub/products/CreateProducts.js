import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { axios } from "../../components/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { africanCountryData } from "./africanCountries";
import { Protectedd } from "../../../utils/Protectedd";
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
    minOrder: "",
    subCategory: "",
    specification: "",
    productDescription: "",
    // commodityTag: "",
  });
  const [specifications, setSpecifications] = useState([
    { type: "", value: "" },
  ]);
  const [country, setCountry] = useState([{ countryName: "", price: "" }]);

  const [commodityTag, setCommodityTag] = useState([]);
  const [myId, setMyId] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [customError, setCustomError] = useState("");

  const getCommodityId = () => {
    axios.get("/commodity").then((response) => {
      setCommodityTag(response.data.data);
      console.log(response.data.data);
    });
  };

  useEffect(() => {
    getCommodityId();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleProductChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleCommodityId = (e) => {
    setCommodityTag({ ...commodityTag, [e.target.name]: e.target.value });
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

  const handleInput = (index, event) => {
    const values = [...specifications];
    values[index][event.target.name] = event.target.value;
    setSpecifications(values);
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newCountry = getCountry();
      console.log("these are specs", specifications);
      console.log("these are countries", newCountry);
      const africanCountry = getCountry();
      const jsonData = {
        productName: capitalizeFirstLetter(productDetails.productName),
        currency: "USD",
        commodityTag: myId,
        parentCategory: productDetails.parentCategory,
        unitForMinOrder: productDetails.unitForMinOrder,
        unitForSupplyCapacity: productDetails.unitForSupplyCapacity,
        minDuration: productDetails.minDuration,
        maxDuration: productDetails.maxDuration,
        minOrdersAllowed: productDetails.minOrder,
        subCategory: productDetails.subCategory,
        productDescription: productDetails.productDescription,
        supplyCapacity: productDetails.supplyCapacity,
        // specification: capitalizeFirstLetter(specific),
        specification: getSpecifications(),
        countries: capitalizeFirstLetter(africanCountry),
      };
      console.log("these are data", jsonData);
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
      console.log(result);

      setTimeout(() => {
        navigate(-1);
      }, 4000);
      setProductDetails("");
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

  const handleAddFields = () => {
    setSpecifications([...specifications, { type: "", value: "" }]);
  };

  const handleAddCountry = () => {
    setCountry([...country, { countryName: "", price: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...specifications];
    if (values.length > 1) {
      values.splice(index, 1);
      setSpecifications(values);
    }
  };

  const handleRemoveCountry = (index) => {
    const countryValues = [...country];
    if (countryValues.length > 1) {
      countryValues.splice(index, 1);
      setCountry(countryValues);
    }
  };
  return (
    <>
      <div className="dashboard-main-wrapper">
        <Navbar />

        <Sidebar />

        <div className="dashboard-wrapper">
          <ToastContainer />
          <div>
            <form className="mx-5 my-5" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <h2> Create Products</h2>

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
                    className="form-control product_input"
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
                    className="form-control product_input"
                    name="parentCategory"
                    aria-describedby="Default select example"
                    onChange={handleProductChange}
                  >
                    <option>Select Parent Cateogory</option>
                    <option>CONSTRUCTION_MATERIAL</option>
                    <option>FOOD_AND_BEVERAGE</option>
                    <option>APPAREL</option>
                    <option>HOME_AND_FURNITURE</option>
                    <option> BEAUTY_AND_PERSONAL_CARE</option>
                    <option>PACKAGING_AND_SUPPLY</option>
                    <option> MINERALS_AND_METALLURGY</option>
                    <option> AGRICULTURE</option>
                  </select>

                  {formErrors.parentCategory && (
                    <p className="text-danger">{formErrors.parentCategory}</p>
                  )}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Sub Category</label>
                  <input
                    name="subCategory"
                    type="text"
                    className="form-control product_input"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.subCategory && (
                    <p className="text-danger">{formErrors.subCategory}</p>
                  )}
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-4 mb-3 ">
                  <label className="form-label">Supply Capacity</label>
                  <div className="d-flex">
                    <input
                      type="number"
                      name="supplyCapacity"
                      className="form-control supply_capacity"
                      onChange={handleProductChange}
                    />

                    <select
                      className="unit_style"
                      name="unitForSupplyCapacity"
                      onChange={handleProductChange}
                    >
                      <option>...select</option>
                      <option>tones</option>
                      <option>kilo</option>
                      <option>grams</option>
                      <option>meter</option>
                    </select>
                  </div>
                  {formErrors.unitForMinOrder && (
                    <p className="text-danger">{formErrors.unitForMinOrder}</p>
                  )}
                </div>

                <div className="col-4">
                  <label className="form-label">Min Order</label>
                  <div className=" d-flex">
                    <input
                      type="number"
                      name="minOrder"
                      className="form-control supply_capacity"
                      onChange={handleProductChange}
                    />

                    <select
                      className="unit_style"
                      name="unitForMinOrder"
                      onChange={handleProductChange}
                    >
                      <option>...select</option>
                      <option>tones</option>
                      <option>kilo</option>
                      <option>grams</option>
                      <option>meter</option>
                    </select>
                  </div>
                  {formErrors.supplyCapacity && (
                    <p className="text-danger">{formErrors.supplyCapacity}</p>
                  )}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label"> Min Lead-Time</label>
                  <input
                    name="minDuration"
                    type="text"
                    className="form-control product_input"
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
                  <label className="form-label">Max Lead-Time</label>
                  <input
                    name="maxDuration"
                    type="text"
                    className="form-control product_input"
                    aria-describedby="emailHelp"
                    onChange={handleProductChange}
                  />
                  {formErrors.maxDuration && (
                    <p className="text-danger">{formErrors.maxDuration}</p>
                  )}
                </div>

                <div className="col-4" style={{ textAlign: "left" }}>
                  <label className="form-label">Specification</label>
                  {specifications.map((specification, index) => (
                    <div key={index} className="root my-2">
                      <input
                        type="text"
                        name="type"
                        value={specification.type}
                        onChange={(event) => handleInput(index, event)}
                        placeholder="type"
                        className="mx-1 form-control specification-keys"
                      />

                      <input
                        type="text"
                        name="value"
                        value={specification.value}
                        onChange={(event) => handleInput(index, event)}
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
                <div className="col-4">
                  <label className="form-label">Country</label>
                  {country.map((info, index) => (
                    <div key={index} className="root my-2">
                      <select
                        value={country.countryName}
                        name="countries"
                        className="mx-1 form-control country-keys"
                      >
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
                        {formErrors.country && (
                          <p className="text-danger">{formErrors.country}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {formErrors.country && (
                    <p className="text-danger">{formErrors.country}</p>
                  )}
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-12">
                  <label className="form-label">Commodity Tag</label>

                  <select
                    className="form-control"
                    name="commodityTag"
                    onChange={(e) => setMyId(e.target.value)}
                  >
                    <option defaultValue={true}>...Select Commodity Tag</option>
                    {commodityTag &&
                      commodityTag.map((commodity) => (
                        <option key={commodity.id} value={commodity.id}>
                          {commodity.name}
                        </option>
                      ))}
                  </select>
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

              <div className="row mx-1">
                <div className="col-6 box">
                  <h3 className="header">Featured Image</h3>

                  {/* <DropFileInput
                      onFileChange={(files) => onFileChange(files)}
                    /> */}
                  <input type="file" name="featuredImage" />
                </div>
                <div className="col-6 ">
                  <div className="mb-3" style={{ textAlign: "left" }}>
                    <label className="form-label d-block">Other Images</label>
                    <input
                      type="file"
                      name="otherImages"
                      accept="image/*"
                      multiple
                      onChange={onSelectFile}
                    />

                    <div className="iamges d-flex image-container">
                      {selectedImages &&
                        selectedImages.map((image, index) => {
                          return (
                            <div key={image} style={{ position: "relative" }}>
                              <img src={image} alt="" className="image" />
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

              <div className="mx-2" style={{ textAlign: "left" }}>
                <button className="btn btn-dark mt-3 px-4">Submit</button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default Protectedd(CreateProducts, ["SUPER_ADMIN", "SOURCE_PRO_ADMIN"]);
