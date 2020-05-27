import axios from 'axios'
import config from '../config.js'


const http = axios.create({
    baseURL: config.apiEndpoint
});

export default http;