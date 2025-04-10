import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const initialState ={
    loading:false,
    error:null,
    Allcategories:[],
    selectedCategoryData:[]
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading= action.payload;
        },
        setErrors: (state, action) => {
            state.error = action.payload;
        },
        setAllCategoryData: (state, action) => {
            state.Allcategories = action.payload;
        },
        setSelectedCategoryData:(state,action) =>{
            state.selectedCategoryData =action.payload;
        }
    }
});

export const fetchAllCategories= (package_id)=> async(dispatch) =>{
    dispatch(setLoading(true));
    try{
        const response =await axios.get(`${API_URL}/category/${package_id}`, {
            withCredentials:true
        });
        dispatch(setAllCategoryData(response.data?.categories))
    }catch(error){
        dispatch(setErrors(error.message || 'Failed to Fetch Categories'))
    }finally{
        dispatch(setLoading(false));
    }
}


export const fetchSelectedCategory = (category_id)=> async(dispatch) =>{
    dispatch(setLoading(true));
    try{
        const response = await axios.get(`${API_URL}/category/single/${category_id}`, {
            withCredentials:true,
        });
        dispatch(setSelectedCategoryData(response.data))
    }catch(error){
        dispatch(setErrors(error.message || 'Failed to Fetch Categories'))
    }finally{
        dispatch(setLoading(false));
    }
}


export const {
    setLoading,
    setErrors,
    setSelectedCategoryData,
    setAllCategoryData,
}=categorySlice.actions;

export default categorySlice.reducer;