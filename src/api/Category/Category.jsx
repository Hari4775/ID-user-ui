import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

console.log('API_URL:', API_URL); 

export const  getCategories =async(package_id) =>{
    console.log(package_id,"package id")
    return await axios.get(`${API_URL}/category/${package_id}`)
}
