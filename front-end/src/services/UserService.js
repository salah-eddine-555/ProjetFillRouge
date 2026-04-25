import API from './API';


export const UpdateStatut = (id) => API.patch(`users/${id}/statut`, {user_id: id});