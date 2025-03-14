// src/api/auth/authApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_ADMIN_API_URL
console.log('API_URL:', API_URL); // This should log "http://localhost:5000/api"

// Function to request OTP for manual registration/login
export const requestOtp = async (fullName, email) => {
  try {
    console.log('Requesting OTP:', { fullName, email });
    // API call to request OTP
    const response = await axios.post(`${API_URL}/auth/request-otp`, { fullName, email });
    console.log('OTP request successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in requestOtp:', error.response?.data || error.message);
    throw error;
  }
};

// Function to verify the OTP for manual registration/login
export const verifyOtp = async (email, otp) => {
  try {
    console.log('Verifying OTP:', { email, otp});
    const response = await axios.post(`${API_URL}/auth/verify_otp`, { email, otp});
    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in verifyOtp:', error.response?.data || error.message);
    throw error;
  }
};


