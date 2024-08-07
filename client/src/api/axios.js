import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(

    config => {

        const token = localStorage.getItem('Authorization')
        config.headers['Authorization'] = token ? token : ''
        // CORS-related headers
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
        config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
        return config

    },
    error => Promise.reject(error)

)

axiosInstance.interceptors.response.use(

    response => response,
    error => Promise.reject(error)

)

export default axiosInstance