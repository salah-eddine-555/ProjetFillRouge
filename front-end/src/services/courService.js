import API from './Api'



export const getStatistiques = () =>  API.get('/prof/statistiques');

export const getCoursProf = () => API.get('/prof/cours');

export const addCour = (data) => API.post('/cours', data);

export const showCour  = (id) => API.get(`/cours/${id}`);

export const getDocumentsCour = (id) => API.get(`/documents/${id}/cours`)

export const assignCourToClasse = (courId, classeId) =>
  API.post(`/cours/${courId}/assign-classe`, {
    classe_id: classeId,
  });