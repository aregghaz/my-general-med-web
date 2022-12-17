import axios from 'axios'

export const homeAPI = {
    getHomeMenuData(activeItem:number,query:string) {
        return axios.get(`/api/home-data?showmore=${activeItem}`).then(res => res.data)
    },
    getHomePageData(activeItem:number,query:string = '') {
        return axios.get(`/api/home-data?page=${activeItem}&querySearch=${query}`).then(res => res.data)
    },
    getCategory() {
        return axios.get('/api/homeData').then(res => res.data)
    }
}

