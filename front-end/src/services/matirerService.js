import API from './Api';




export const getMatieres = async () => {
    
    try{
        const res = await API.get('/matieres');
        return res.data.data;

    }catch(error){
        throw error.response?.data || error
    }
}

export const addMatiere = (data) => API.post('/matieres', data);

export const updateMatiere = (id, data) => API.put(`/matieres/${id}`, data);

export const deleteMatiere = (id) => API.delete(`/matieres/${id}`);