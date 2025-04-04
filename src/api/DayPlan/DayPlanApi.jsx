import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const  getPlan =async(category_id) =>{
    console.log(category_id)
    return await axios.get(`${API_URL}/plan/${category_id}`,{
        withCredentials:true
    })
}

