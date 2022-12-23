import axios from 'axios'
import { IOption } from '../../components/select/select'


interface IClintSendData {
    titles:Array<string>,
    query?:string,
    showMore:number
}
export const homeAPI = {

    getCLientById(id:number) {
        return axios.get(`/api/home-data/${id}`).then(res => res.data)
    },

    getHomePageData(activeItem: number, query: string = '') {
        return axios.get(`/api/home-data?page=${activeItem}&querySearch=${query}`).then(res => res.data)
    },
    getClientData(options:IClintSendData){
        return axios.post(`/api/clientData`,options).then(res => res.data)
    },
    getCategory() {
        return axios.get('/api/homeData').then(res => res.data)
    },

}

