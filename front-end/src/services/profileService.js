import API from './Api';


export const createProfileProf = ($data) => API.post('/profile/prof', $data);
export const createProfileEleve = ($data) => API.post('/profile/eleve', $data);

export const updateProfile = ($data) => API.put('/profile', $data);

