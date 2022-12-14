import axios from 'axios'

export const AdminApi = {
    getAllData(crudKey:string) {
        return axios.get(`/api/admin/${crudKey}`).then(res => res.data)
    },
    delete(crudKey:string,deleteId:number) {
        return axios.get('/api/auth/user').then(res => res.data)
    },
    store(formData: FormData,crudKey:string) {
        return axios.post(`/api/auth/${crudKey}`,formData).then(res => res.data)
    },
    getUserData(crudKey:string,id:number) {
        return axios.get(`/api/admin/${crudKey}/${id}`).then(res => res.data)

    },
    create(crudKey:string) {
        return axios.get(`/api/auth/${crudKey}/create`).then(res => res.data)
    },
    getDataFromSite(crudKey:string) {
        return axios.get(`/api/auth/${crudKey}`).then(res => res.data)
    },
}
