import axios from "axios"

export  default axios.create({

    // baseURL:import.meta.env.VITE_BACKEND_URL
     baseURL:"http://localhost:8000",
        // baseURL:'http://127.0.0.1:8000/api',
  withXSRFToken:true,
    withCredentials:true



})
