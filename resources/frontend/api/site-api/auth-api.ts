import axios from 'axios'
const token = localStorage.getItem('access_token') || ''
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + token
    return config
})
export const authAPI = {

    register(formData: FormData) {
        return axios.post('/api/auth/signup', formData).then(res => res.data)
    },
    login(formData: FormData) {
        return axios.post('/api/auth/login', formData).then(res => res)
    },
    getUser() {
        return axios.get('/api/auth/user').then(res => res.data)
    },
    logout() {
        return axios.get('/api/auth/logout').then(res => res.data)
    }
}
