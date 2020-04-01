import axios from 'axios';

const api = new axios.create({
    baseURL: "http://srvteleset.ddns.net:8000",
});

export default api;