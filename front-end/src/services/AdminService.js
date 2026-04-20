import API from './Api';



export const getStatistiques = async () => {

    try{
        const response = await API.get("/statistiques");
        return response.data;
    }catch(error){
        throw  error.response?.data || error
    }
}

export const getUsers = async () => {

    try{
        const response = await API.get("/users");
        return response.data;
    }catch(error){
        throw error.response?.data || error
    }
}



