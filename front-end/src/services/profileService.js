import axios  from "axios";



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

export const createProfileProf = ($data) => API.post('/profile/prof', $data);
export const createProfileEleve = ($data) => API.post('/profile/eleve', $data);

export const updateProfile = ($data) => API.put('/profile', $data);

