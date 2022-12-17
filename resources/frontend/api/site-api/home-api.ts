import axios from 'axios'

export const homeAPI = {
    getHomeMenuData() {
        return axios.get('/api/home-data').then(res => res.data)
    },
    getHomePageData() {
        return axios.get('/api/home-data').then(res => res.data)
    },
    getCategory() {
        return axios.get('/api/homeData').then(res => res.data)
    }
}

