import axios from 'axios';
import {store} from '../Redux/store';
import {logout} from '../Redux/authSlice';


const API = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        
    }
})

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

API.interceptors.response.use((response) => response, (error) => {

        if(error.response?.status === 403 || error.response?.status === 401){
            localStorage.removeItem("token");
            store.dispatch(logout());
            window.location.href = "/login";
        }
        return Promise.reject(error);
})

export default API;