import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(

    config => {

        const token = localStorage.getItem('Authorization')
        config.headers['Authorization'] = token ? token : ''
        return config

    },
    error => Promise.reject(error)

)

axiosInstance.interceptors.response.use(

    response => response,
    error => Promise.reject(error)

)

export default axiosInstance