import axios from 'axios'

export const authAPI = {

    register(formData: FormData) {
        return axios.post('/api/auth/signup', formData).then(res => res.data)
    },
    login(formData: FormData) {
        return axios.post('/api/auth/login', formData).then(res => res)
    },
    getUser() {
        return axios.get('/api/auth/user').then(res => res.data)
    }
}
