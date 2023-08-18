import axios from "axios";


const api = axios.create({baseURL: 'http://192.168.0.15:8000', withCredentials: true})

export default api