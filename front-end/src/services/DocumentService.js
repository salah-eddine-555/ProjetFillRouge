import API from './API';

export const addDoc = (id,data) => API.post(`cours/${id}/documents`, data);

export const updateDoc = (id, data) => API.put(`/documents/${id}`, data);

export const deleteDoc = (id) => API.delete(`/documents/${id}`);