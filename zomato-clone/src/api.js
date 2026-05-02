import axios from "axios"

//creating an instance of axios with base url

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL || "http://localhost:8000"
    // baseURL : "http://localhost:8000"
})

export default api;
