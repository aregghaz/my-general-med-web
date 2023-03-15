import axios from "axios";


interface IClintSendData {
    titles: Array<string>,
    queryData?: string,
    showMore: number,
    typeId: number
}

const CancelToken = axios.CancelToken;
let cancelPost: any;
export const vendorAPI = {

    getVendorData(tabId: number) {
        return axios.get("/api/vendorClients").then(res => res.data);
    },
    getModel(id: number) {
        return axios.get(`/api/make/${id}`).then(res => res.data);
    },
    getCarsData(crudKey: string) {
        return axios.get(`/api/${crudKey}`).then(res => res.data);
    },

    getCarsDataForSelect(crudKey: string) {
        return axios.get(`/api/car-data-for-select`).then(res => res.data);
    },
    getReasonData() {
        return axios.get(`/api/get-reason-data`).then(res => res.data);
    },
    getVendorsDataForSelect() {
        return axios.get(`/api/admin/vendor-data-for-select`).then(res => res.data);
    },
    assignCarToClient(data: { ids: Array<number>, carId: number }) {
        return axios.post(`/api/assign-car-client`, data).then(res => res.data);
    },
    assignVendorToClient(data: { ids: Array<number>, vendorId: number }) {
        return axios.post(`/api/admin/assign-vendor-client`, data).then(res => res.data);
    },
    getItemData(crudKey: string, id: number) {
        return axios.get(`/api/${crudKey}/${id}`).then(res => res.data);
    },
    editUserData(crudKey: string, id: number) {
        return axios.get(`/api/${crudKey}/${id}/edit`).then(res => res.data);
    },
    update(formData: FormData, crudKey: string, id: number) {

        return axios.post(`/api/${crudKey}/${id}`, formData).then(res => res.data);
    },
    createUserData(crudKey: string) {
        return axios.get(`/api/${crudKey}/create`).then(res => res.data);
    },
    cancelRequest() {
        return cancelPost();
    }

};

