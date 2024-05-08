import axios from "axios"

export  const axiosclient= axios.create({

    baseURL:import.meta.env.VITE_BACKEND_URL
})
