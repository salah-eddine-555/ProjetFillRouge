import API from './API';

export const addDoc = (id,data) => API.post(`cours/${id}/documents`, data);