import axios from "axios"
import { BASE_URL } from "./apiPath"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
    }
})


//request interceptor
axiosInstance.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem("AIToken")
    if(accessToken){
        config.headers.Authorization = accessToken
    }
    return config
},
(error)=>{
    return Promise.reject(error)
}
)


//response interceptor
axiosInstance.interceptors.response.use((response)=>{
  return response
},
(error)=>{
    console.error("Server error. Try again", error)
    return Promise.reject(error)
}
)


export default axiosInstance