import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:82',
    headers: {"Content-type":"application/json" }
});