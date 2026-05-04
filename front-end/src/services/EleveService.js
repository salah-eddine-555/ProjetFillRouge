import API from './Api';


export const getInfoEleve = () =>  API.get('eleve/info');
export const getCourEleve = () => API.get('/eleve/cours');

export const showDeatisCour = (id) => API.get(`/eleve/cour/${id}`);