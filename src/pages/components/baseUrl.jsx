import api from "axios"

export const axios = api.create({
    withCredentials: true
})


// import api from "axios"

// const baseUrl = process.env.REACT_APP_BACKEND_URL
// let headers = {}

// const token = localStorage.getItem("tokenValue")

// if (token) {
//     headers.Authorization = `Bearer ${token}`
// }

// export const axios = api.create({
//     baseUrl:baseUrl,
//     headers,
// });











