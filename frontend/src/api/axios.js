import axios from 'axios';
export const axiosInstance = axios.create({
      // baseURL:import.meta.env.VITE_BACKEND_URL
    baseURL:"http://localhost:8000",
    withCredentials:true,
    withXSRFToken:true,
});



