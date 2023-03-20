import axios from "axios";
import { IClintSendData } from "../../types/api";

export const AdminApi = {

    dashboard() {
        return axios.get("/api/admin/dashboard").then(res => res.data);
    },
    delete(crudKey: string, deleteId: number) {
        return axios.get("/api/auth/user").then(res => res.data);
    },

    store(formData: FormData, crudKey: string, isAdmin: boolean) {
        return axios.post(`/api/${isAdmin ? "admin/" : ""}${crudKey}`, formData).then(res => res.data);
    },

    getUserData(crudKey: string, id: number) {
        return axios.get(`/api/admin/${crudKey}/${id}`).then(res => res.data);
    },
    editUserData(crudKey: string, id: number) {
        return axios.get(`/api/admin/${crudKey}/${id}/edit`).then(res => res.data);
    },
    audit() {
        return axios.get(`/api/admin/audit`).then(res => res.data);
    },

    getAllData(options: IClintSendData) {
        return axios.post(`/api/admin/clientsData`, options, {}).then(res => res.data);
    },
    getAllStatusData(crudKey: string, tabId: number) {
        return axios.get(`/api/admin/${crudKey}/${tabId}`).then(res => res.data);
    },
    createItem(crudKey: string) {
        return axios.get(`/api/admin/${crudKey}/create`).then(res => res.data);
    },
    getAllVendorData(crudKey: string, typeId: number, query: string) {
        return axios.get(`/api/admin/${crudKey}?typeId=${typeId}&queryData=${query}`).then(res => res.data);
    },
    update(formData: FormData, crudKey: string, id: number) {

        return axios.post(`/api/${crudKey}/${id}`, formData).then(res => res.data);
    },
    //////////
    create(crudKey: string) {
        return axios.get(`/api/auth/${crudKey}/create`).then(res => res.data);
    },

    getDataFromSite(crudKey: string) {
        return axios.get(`/api/auth/${crudKey}`).then(res => res.data);
    },
    getVendorUsers(id: number, tabIdSelected: number) {
        return axios.get(`/api/admin/getVendorUsers/${id}/${tabIdSelected}`).then(res => res.data);
    },
    getActivityOperator(id: number) {
        return axios.get(`/api/admin/getActivityOperator/${id}`).then(res => res.data);
    },
    getActivityClient(id: number) {
        return axios.get(`/api/admin/getActivityClient/${id}`).then(res => res.data);
    },
    changeStatus(crudKey: string, id: number, statusId: number) {
        return axios.get(`/api/admin/${crudKey}/${id}/${statusId}`).then(res => res.data);
    },
    updateClient(data: { pick_up: string, drop_down: string, additionalNote: string }, id: number) {
        return axios.post(`/api/admin/updateClient/${id}`, data, {}).then(res => res.data);
    },
    getNotification(showMore: number) {
        return axios.get(`/api/admin/get-notification/${showMore}`, {}).then(res => res.data);
    },
    getCount() {
        return axios.get(`/api/admin/get-count/`, {}).then(res => res.data);
    },
    getInfoData(id: number, role:string) {
        return axios.get(`/api/admin/get-info/${id}/${role}`, {}).then(res => res.data);
    },
    deleteStatus(id:number, tabId:number) {
      return axios.get(`/api/admin/deleteStatus/${tabId}/${id}`)
    }
};
