import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import { axios } from "../../components/baseUrl";
// import { useAppContext } from "../../../utils/contexts/AppContext";
// import DropFileInput from "../../components/DropFileInput";
// import OtherImages from "./OtherImages";

const EditProducts = () => {
  const [id, setId] = useState(0);
  const [productName, setProductName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [unitForMinOrder, setUnitForMinOrder] = useState("");
  const [supplyCapacity, setSupplyCapacity] = useState("");
  const [unitForSupplyCapacity, setUnitForSupplyCapacity] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  //   const [productInfo, setProductInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const [specification, setSpecification] = useState([{ Type: "", Color: "" }]);

  //   const {name} = useAppContext()

  //   console.log(name)

  const handleAddFields = () => {
    setSpecification([...specification, { Type: "", Color: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...specification];
    values.splice(index, 1);
    setSpecification(values);
  };

  const { productId } = useParams();
  console.log(productId);

  const getInfo = async () => {
    try {
      const response = await axios.get(`/product/${productId}`);
      // setProductInfo(response.data.data)
      setId(response.data.data.id);
      setProductName(response.data.data.productName);
      setParentCategory(response.data.data.parentCategory);
      setUnitForMinOrder(response.data.data.unitForMinOrder);
      setSupplyCapacity(response.data.data.supplyCapacity);
      setUnitForSupplyCapacity(response.data.data.unitForSupplyCapacity);
      setMinDuration(response.data.data.minDuration);
      setMaxDuration(response.data.data.maxDuration);
      setCategory(response.data.data.category);
      setSubCategory(response.data.data.subCategory);
      setProductDescription(response.data.data.productDescription);
      // setProductInfo(response.data.data.productInfo)
      const responseSpecifications = response.data.data.productSpecification;
      Object.keys(responseSpecifications);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`/product/${id}`, {
        productName: productName,
        parentCategory: parentCategory,
        unitForMinOrder: unitForMinOrder,
        supplyCapacity: supplyCapacity,
        unitForSupplyCapacity: unitForSupplyCapacity,
        minDuration: minDuration,
        maxDuration: maxDuration,
        category: category,
        subCategory: subCategory,
        productDescription: productDescription,
      });
      toast.success("SUCCESSFULLY CREATED NEW COMMODITY", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error("FAILED! TRY AGAIN", {
        position: "top-right",
        autoClose: 4000,
        pauseHover: true,
        draggable: true,
      });
      console.log(err);
    }
    // navigate("/products");
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
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
            <form className="mx-5 my-5">
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
                    value={productName}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  {/* {formErrors.productName && (
                    <p className="text-danger">{formErrors.productName}</p>
                  )} */}
                </div>

                <div className="col-4 ">
                  <label className="form-label">Parent Category</label>

                  <select
                    className="form-control"
                    name="parentCategory"
                    value={parentCategory}
                    aria-describedby="Default select example"
                    onChange={(e) => setParentCategory(e.target.value)}
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
                  {/* {formErrors.parentCategory && (
                    <p className="text-danger">{formErrors.parentCategory}</p>
                  )} */}
                </div>

                <div className="col-4 ">
                  <label className="form-label">Supply Capacity</label>
                  <input
                    type="number"
                    value={supplyCapacity}
                    name="supplyCapacity"
                    className="form-control"
                    onChange={(e) => setSupplyCapacity(e.target.value)}
                  ></input>
                  {/* {formErrors.supplyCapacity && (
                    <p className="text-danger">{formErrors.supplyCapacity}</p>
                  )} */}
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
                    value={unitForMinOrder}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setUnitForMinOrder(e.target.value)}
                  />
                  {/* {formErrors.unitForMinOrder && (
                    <p className="text-danger">{formErrors.unitForMinOrder}</p>
                  )} */}
                </div>

                <div className="col-4  mb-3">
                  <label className="form-label">Unit of Supply Capacity</label>
                  <input
                    name="unitForSupplyCapacity"
                    value={unitForSupplyCapacity}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setUnitForSupplyCapacity(e.target.value)}
                  />
                  {/* {formErrors.unitForSupplyCapacity && (
                    <p className="text-danger">
                      {formErrors.unitForSupplyCapacity}
                    </p>
                  )} */}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Min Duration</label>
                  <input
                    name="minDuration"
                    value={minDuration}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setMinDuration(e.target.value)}
                  />
                  {/* {formErrors.minDuration && (
                    <p className="text-danger">{formErrors.minDuration}</p>
                  )} */}
                </div>
              </div>

              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-4  mb-3">
                  <label className="form-label">Max Duration</label>
                  <input
                    name="maxDuration"
                    value={maxDuration}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setMaxDuration(e.target.value)}
                  />
                  {/* {formErrors.maxDuration && (
                    <p className="text-danger">{formErrors.maxDuration}</p>
                  )} */}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Category</label>
                  <input
                    name="category"
                    value={category}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {/* {formErrors.category && (
                    <p className="text-danger">{formErrors.category}</p>
                  )} */}
                </div>

                <div className="col-4 mb-3">
                  <label className="form-label">Sub Category</label>
                  <input
                    name="subCategory"
                    value={subCategory}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                  {/* {formErrors.subCategory && (
                    <p className="text-danger">{formErrors.subCategory}</p>
                  )} */}
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
                  {/* {formErrors.specification && (
                    <p className="text-danger">{formErrors.specification}</p>
                  )}  */}
                </div>

                <div className="col-6">
                  <label className="form-label">Country</label>
                  {/* {country.map((info, index) => (
                    <div key={index} className="root my-2">
                      <input
                        type='text'
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
                      /> */}

                  {/* <div className="d-flex align-items-center">
                        <i
                          className="fa-solid fa-plus mx-1 "
                          onClick={() => handleAddCountry()}
                        ></i>
                        <i
                          className="fa-solid fa-minus mx-1"
                          onClick={() => handleRemoveCountry(index)}
                        ></i>
                      </div> */}
                  {/* </div>
                  ))} */}
                  {/* {formErrors.country && (
                    <p className="text-danger">{formErrors.country}</p>
                  )} */}
                </div>
              </div>

              <div className="mb-3" style={{ textAlign: "left" }}>
                <label className="form-label">Description</label>
                <textarea
                  name="productDescription"
                  value={productDescription}
                  type="text"
                  className="form-control"
                  onChange={(e) => setProductDescription(e.target.value)}
                />
                {/* {formErrors.productDescription && (
                  <p className="text-danger">{formErrors.productDescription}</p>
                )} */}
              </div>

              {/* <div className="row">
                  <div className="col-6 box">
                    <h3 className="header">Featured Images</h3> */}

              {/* <DropFileInput
                      onFileChange={(files) => onFileChange(files)}
                    /> */}
              {/* <input type="file" name="featuredImage" />
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
                /> */}

              {/* <div className="iamges d-flex">
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <div
                          key={image}
                          className="image"
                          style={{ position: "relative" }}
                        >
                          <img src={image} alt="" /> */}
              {/* <button
                            onClick={() =>
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          >
                            delete image
                          </button> */}
              {/* <div
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
              </div> */}

              {/* <input
                className="productInput"
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}

              <div style={{ textAlign: "left" }}>
                <button
                  className="btn btn-dark"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- end main wrapper --> */}
      </div>
    </>
  );
};

export default EditProducts;
