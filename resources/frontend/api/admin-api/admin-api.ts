import axios from 'axios'

export const AdminApi = {

    delete(crudKey: string, deleteId: number) {
        return axios.get('/api/auth/user').then(res => res.data)
    },

    store(formData: FormData, crudKey: string) {
        return axios.post(`/api/admin/${crudKey}`, formData).then(res => res.data)
    },

    getUserData(crudKey: string, id: number) {
        return axios.get(`/api/admin/${crudKey}/${id}`).then(res => res.data)
    },

    getAllData(crudKey: string, page: number, query: string,tabId?:number) {
        return axios.get(`/api/admin/${crudKey}?page=${page}&query=${query}&tabId=${tabId}`).then(res => res.data)
    },
    getAllStatusData(crudKey: string) {
        return axios.get(`/api/admin/${crudKey}/escortType`).then(res => res.data)
    },
    createItem(crudKey: string) {
        return axios.get(`/api/admin/${crudKey}/create`).then(res => res.data)
    },
    getAllVendorData(crudKey:string,page:number,query:string) {
        return axios.get(`/api/admin/${crudKey}?page=${page}&query=${query}`).then(res => res.data)
    },
    update(formData: FormData, crudKey: string, id: number){

        return axios.post(`/api/admin/${crudKey}/${id}`, formData).then(res => res.data)
    },
    //////////
    create(crudKey: string) {
        return axios.get(`/api/auth/${crudKey}/create`).then(res => res.data)
    },

    getDataFromSite(crudKey: string) {
        return axios.get(`/api/auth/${crudKey}`).then(res => res.data)
    },
}
