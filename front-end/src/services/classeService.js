import API from './Api';


export const getClasses = () => API.get('/classes');

export const addClasse  = (data) => API.post('/classes', data);

export const getClasseById = (id) => API.get(`/classes/${id}`);

export const getElevesNonAssigne = () => API.get('/Nonassgine');

export const assigneEleve  = ($data) => API.post('/assgine/eleves', $data)

export const getProfesseurs = () => API.get('/professeurs');

export const assigneProf = ($data) => API.post('/assgine/prof', $data);

export const retirerEleve = ($data) => API.post('/retirer', $data);