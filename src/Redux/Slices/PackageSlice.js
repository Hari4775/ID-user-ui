// src/redux/slices/packageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


const initialState = {
  loading: false,
  error: null,
  packages: [],
  singlePackage: null,
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
    setPackageData: (state, action) => {
      state.packages = action.payload;
    },
    setSinglePackage: (state, action) => {
      state.singlePackage = action.payload;
    },
  },
});

export const fetchPackages = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_URL}/packages`, {
        withCredentials: true,
      });
      dispatch(setPackageData(response.data.packages));
    } catch (error) {
      dispatch(setErrors(error.message || 'Failed to fetch packages'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const fetchPackageById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_URL}/packages/${id}`, {
        withCredentials: true,
      });
      dispatch(setSinglePackage(response.data));
    } catch (error) {
      dispatch(setErrors(error.message || 'Failed to fetch package'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const {
  setLoading,
  setErrors,
  setPackageData,
  setSinglePackage,
} = packageSlice.actions;

export default packageSlice.reducer;
