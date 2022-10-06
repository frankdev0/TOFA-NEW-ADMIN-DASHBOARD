import React from 'react'
import { Link} from 'react-router-dom'
import './unauthorized.css'

const Unauthorized = () => {


  return (
    <div className='tab'>
       <div className="w3-display-middle">
<h1 className="w3-jumbo w3-animate-top w3-center text-danger"><code>Access Denied</code></h1>
<hr className="w3-border-white w3-animate-left mx-auto" style={{width:'50%'}}/>
<h3 className="w3-center w3-animate-right">You dont have permission to view this Page.</h3>
<h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
<Link to ="/login" className='h5'>Go to Login Page</Link>
<h6 className="w3-center w3-animate-zoom error mt-2">error code:403 forbidden</h6>
</div>
    </div>
  )
}

export default Unauthorized;