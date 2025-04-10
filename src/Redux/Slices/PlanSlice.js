// src/redux/slices/packageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


const initialState = {
  loading: false,
  error: null,
  planData: [],
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
  },
});

export const fetchPlans = (category_id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_URL}/plan/${category_id}`,{
        withCredentials:true
        })
        console.log(response.data,'responce')
      dispatch(setPlanData( Array.isArray(response.data) ? response.data : [response.data]));
    } catch (error) {
      dispatch(setErrors(error.message || 'Failed to fetch packages'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  

export const {
  setLoading,
  setErrors,
  setPlanData,
} = planSlice.actions;

export default planSlice.reducer;
