import axios from 'axios';

const api = axios.create({
    baseURL: "http://telesetapp.ddns.net:8000",
});

export default api;