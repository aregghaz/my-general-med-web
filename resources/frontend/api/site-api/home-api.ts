import axios from 'axios'
import {IOption} from '../../components/select/select'
import { IClintSendData } from "../../types/api";


// interface IClintSendData {
//     titles: Array<string>,
//     queryData?: string,
//     showMore: number,
//     typeId:number
// }

const CancelToken = axios.CancelToken
let cancelPost: any;
export const homeAPI = {
    getCLientById(id: number) {
        return axios.get(`/api/home-data/${id}`).then(res => res.data)
    },
    changeClientsTypes(clientTypeChangeData: {status:number, ids:Array<number>, reasonId?:number}){
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
    updateClient(data: {pick_up:string, drop_down:string, additionalNote:string},id:number) {
        return axios.post(`/api/updateClient/${id}`, data, {
        }).then(res => res.data)
    },
    getVendorData(tabId:number) {
        return axios.get(`/api/vendorClients?tabId=${tabId}`).then(res => res.data)
    },
    editUserData(crudKey: string, id: number) {
        return axios.get(`/api/${crudKey}/${id}/edit`).then(res => res.data)
    },
    dashboard() {
        return axios.get(`/api/dashboard`).then(res => res.data)
    },
    cancelRequest() {
      ///  return cancelPost()
    }

}

