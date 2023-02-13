import axios from "axios";

export const axiosInstance = axios.create({
  //create instance
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

//set the Auth token for any request
axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("tokenValue");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});












// import api from "axios"

// export const axios = api.create({
//     withCredentials: true
// })


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











