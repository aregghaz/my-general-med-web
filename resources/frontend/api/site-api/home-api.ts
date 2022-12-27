import axios from 'axios'
import {IOption} from '../../components/select/select'


interface IClintSendData {
    titles: Array<string>,
    queryData?: string,
    showMore: number
}

const CancelToken = axios.CancelToken
let cancelPost: any;
export const homeAPI = {

    getCLientById(id: number) {
        return axios.get(`/api/home-data/${id}`).then(res => res.data)
    },

    getHomePageData(activeItem: number, query: string = '') {
        return axios.get(`/api/home-data?page=${activeItem}&querySearch=${query}`).then(res => res.data)
    },
    getClientData(options: IClintSendData) {
        return axios.post(`/api/clientData`, options, {
            cancelToken: new CancelToken(function executor(c) {
                cancelPost = c;
            })
        }).then(res => res.data)
    },
    getCategory() {
        return axios.get('/api/homeData').then(res => res.data)
    },
    cancelRequest() {
        return cancelPost()
    }

}

