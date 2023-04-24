import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
//import {baseURL} from "./BaseUrl";

const clientAxios = axios.create({
    baseURL : "http://localhost:8000/api/donate"
})

clientAxios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
})

clientAxios.interceptors.response.use(
    (response : AxiosResponse) => response
    ,(error : AxiosError) => handleError(error)
)

const handleError = (error : AxiosError) => {
    if (axios.isAxiosError(error)) {
        if (error.code !== '200' && error.code !== '201') {
            throw error.response.data?.errors
        }
    }
};



export default clientAxios