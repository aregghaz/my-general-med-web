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
export const vendorAPI = {

    getVendorData(tabId:number) {
        return axios.get('/api/vendorClients').then(res => res.data)
    },
    editUserData(crudKey: string, id: number) {
        return axios.get(`/api/${crudKey}/${id}/edit`).then(res => res.data)
    },
    createUserData(crudKey: string) {
        return axios.get(`/api/${crudKey}/create`).then(res => res.data)
    },
    cancelRequest() {
        return cancelPost()
    }

}

