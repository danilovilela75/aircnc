import axios from 'axios';

const api = axios.create({
    baseURL: "http://srvteleset.ddns.net:8000",
});

export default api;