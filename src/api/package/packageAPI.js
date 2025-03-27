// src/api/project/projectApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
     
export const getPackages = async () => {
    return await axios.get(`${API_URL}/packages`);
};

export const getPackage = async (projectId) => {
    return await axios.get(`${API_URL}/packages/${projectId}`,);
};



