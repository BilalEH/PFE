import axios from "axios"

export  const axiosclient= axios.create({

    // baseURL:import.meta.env.VITE_BACKEND_URL
    baseURL:'http://127.0.0.1:8000/api',
})
