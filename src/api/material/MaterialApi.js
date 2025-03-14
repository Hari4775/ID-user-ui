import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export const createMaterial = async (project_id, user_id,material_name,material_file) => {
        return await axios.post(`${API_URL}/material/create`, {project_id, user_id,material_name,material_file});
};

export  const  getMaterial =async (user_id,project_id)=>{
    return await axios.get(`${API_URL}/material/list`,{params:{user_id,project_id}});
};

