import axios from 'axios'
import {IOption} from '../../components/select/select'


interface IClintSendData {
    titles: Array<string>,
    queryData?: string,
    showMore: number,
    typeId:number
}

const CancelToken = axios.CancelToken
let cancelPost: any;
export const homeAPI = {
    getCLientById(id: number) {
        return axios.get(`/api/home-data/${id}`).then(res => res.data)
    },
    changeClientsTypes(clientTypeChangeData: {status:number, ids:Array<number>}){
        return axios.post(`/api/changeClientType`, clientTypeChangeData, {
            // cancelToken: new CancelToken(function executor(c) {
            //     cancelPost = c;
            // })
        }).then(res => res.data)
    },
    getHomePageData(activeItem: number, query: string = '') {
        return axios.get(`/api/home-data?page=${activeItem}&querySearch=${query}`).then(res => res.data)
    },
    getClientData(options: IClintSendData) {
        return axios.post(`/api/clientData`, options, {
            // cancelToken: new CancelToken(function executor(c) {
            //     cancelPost = c;
            // })
        }).then(res => res.data)
    },
    getVendorData(tabId:number) {
        return axios.get(`/api/vendorClients?tabId=${tabId}`).then(res => res.data)
    },
    editUserData(crudKey: string, id: number) {
        return axios.get(`/api/${crudKey}/${id}/edit`).then(res => res.data)
    },
    cancelRequest() {
      ///  return cancelPost()
    }

}

