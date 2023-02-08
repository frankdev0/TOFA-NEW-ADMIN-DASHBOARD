import api from "axios"

export const axios = api.create({
    withCredentials: true
})

// import axios from axios

// const baseUrl = process.env.REACT_APP_BACKEND_URL

// const axios = axios.create({
//     baseUrl:baseUrl,
// })

// export default axios