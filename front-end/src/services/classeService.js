import API from './Api';


export const getClasses = () => API.get('/classes');

export const addClasse  = (data) => API.post('/classes', data);

export const getClasseById = (id) => API.get(`/classes/${id}`);