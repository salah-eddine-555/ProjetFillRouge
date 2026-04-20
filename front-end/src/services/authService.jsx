import axios from 'axios';


const API = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "Application/json"
    }
})

export const resgiter = ($data) => API.post("/register", $data);

export const login = ($data) => API.post("/login", $data);

export const logout = () => API.post("/logout");

