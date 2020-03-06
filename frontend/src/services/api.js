import axios from 'axios';

const api = new axios.create({
    baseURL: "http://telesetapp.ddns.net:8000",
});

export default api;