import axios from "axios"

export  default  axios.create({

    // baseURL:import.meta.env.VITE_BACKEND_URL
     baseURL:"http://localhost:8000",


    timeout: 60000, withCredentials: true, withXSRFToken: true,
})
