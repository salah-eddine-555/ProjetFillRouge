import API from './Api';


export const getNivaux = async () => {

    try{
        const res = await API.get('/niveaux');
        return res.data;

    }catch(error){
          throw error.response?.data || error;
    }
}

export const addNiveaux = (data) => API.post("/niveaux", data);

export const updateNiveaux = (id, data) => API.put(`/niveaux/${id}`, data);

export const deteleNiveaux = (id) => API.delete(`/niveaux/${id}`);
