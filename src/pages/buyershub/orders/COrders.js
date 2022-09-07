import React, { useState } from 'react'
import { axios } from '../../components/baseUrl'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const COrders = () => {

    const [formErrors, setFormErrors] = useState({})
    const [customError, setCustomError] = useState("")
    const [orders, setOrders] = useState({
    quantity:"",
    country:"",
    address:"",
    paymentTerm:"",
    grade:"",
    specification:""
  })

  const handleOrderChange = (e) => {
    setOrders({...orders, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
     const {data: result} = await axios.post("/order/local", {
        quantity:orders.quantity,
      country:orders.country,
      address:orders.address,
      paymentTerm:orders.paymentTerm,
      grade:orders.grade,
      specification:orders.specification,
  
      headers: {
        "Content-Type": "multipart/form-data",
      },
      })
      console.log(result)
    } catch (err) {
       if (err.response.data.errors[0].field) {
           setFormErrors(err.response.data.errors.reduce (function(obj, err) {
               obj[err.field] = err.message;
               return obj;
           }, {}))
       } else {
           console.log(err.response.data.errors[0].message)
           setCustomError(err.response.data.errors[0].message)
           alert(customError)
       }
    }

}
 
  return (
    <>
       {/* <!-- main wrapper --> */}
       <div className="dashboard-main-wrapper">
        {/* <!-- navbar --> */}
       <Navbar/>

        {/* <!-- left sidebar --> */}
        <Sidebar/>
        


        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
        <div>

        <form className="mx-5 my-5">
            <div className="d-flex justify-content-between">
              <h2> Create Order</h2>
              {/* <Link to="/commodityInsight">
                <button className="btn btn-primary m-3">Show Commodity</button>
              </Link> */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" align="right">
                        <a href="/orders" className="btn btn-dark">Show Order</a>
                    </div>
            </div>

            <div className="row" style={{textAlign:'left'}}>
              <div className="col-4 mb-3">
                <label className="form-label">Quantity</label>
                <input
                 
                  name="quantity"
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={handleOrderChange}
                />
                {formErrors.quantity && (<p className="text-danger">{formErrors.quantity}</p>)}
              </div>
              <div className="col-4 mb-3">
                <label className="form-label">Payment Term</label>
                <select className="form-control"
                    name="paymentTerm"
                    aria-describedby="Default select example"
                    onChange={handleOrderChange}
                    placeholder='parent category'
                    >
                      <option>CAD</option>
                      <option>DP</option>
                      <option>LC</option>
                      <option>TT</option>
                  </select>
                {formErrors.paymentTerm && (<p className="text-danger">{formErrors.paymentTerm}</p>)}
              </div>
              <div className="col-4 mb-3">
                <label className="form-label">Grade</label>
                <input
               
                  name="grade"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={handleOrderChange}
                />
                {formErrors.grade && (<p className="text-danger">{formErrors.grade}</p>)}
              </div>
            </div>

            <div className="row" style={{textAlign:'left'}}>
              <div className="col-8 mb-3">
                <label className="form-label">Address</label>
                <input
                  name="address"
                  onChange={handleOrderChange}
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  
                />
                {formErrors.address && (<p className="text-danger">{formErrors.address}</p>)}
              </div>
              <div className="col-4  mb-3">
                <label className="form-label">Country</label>
                <input
                  name="country" 
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={handleOrderChange}
                />
                {formErrors.country && (<p className="text-danger">{formErrors.country}</p>)}
              </div>
              
            </div>

            <div className="mb-3" style={{textAlign:'left'}}>
              <label className="form-label">Specification</label>
              <textarea
                name="specification"
                onChange={handleOrderChange}
                type="text"
                className="form-control"
                
              />
              {formErrors.specification && (<p className="text-danger">{formErrors.specification}</p>)}
            </div>
            {/* <div className="mb-3" style={{textAlign:'left'}}>
            
              <label className="form-label mx-2">Upload Product</label>
              <input
                type="file"
                id="img"
                name="fileName"
                accept="image/*"
                
              />
            </div> */}

            <div style={{textAlign:'left'}} >
            <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
           
            </div>

           

        </div>
        {/* <!-- end main wrapper --> */}

    </div>

    </>
  )
}

export default COrders;