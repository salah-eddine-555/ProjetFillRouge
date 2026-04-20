import API from './Api';


export const resgiter = ($data) => API.post("/register", $data);

export const login = ($data) => API.post("/login", $data);

export const logout = () => API.post("/logout");

