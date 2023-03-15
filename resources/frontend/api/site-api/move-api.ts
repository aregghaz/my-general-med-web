import axios from "axios";

export const movesAPI = {
    getMovesData(crudKey: string, showMore: number) {
        return axios.post(`/api/all/${crudKey}`, {
            showMore: showMore
        }).then(res => res.data);
    },
    getFilterMovesData(filter: any) {
        return axios.post(`/api/getFilterMovesData`, {
            filter: filter
        }).then(res => res.data);
    },
    getSingleData(crudKey: string, id: string) {
        return axios.get(`/api/data/${crudKey}/${id}`).then(res => res.data);
    },
    getSingleDataById(crudKey: string, id: number) {
        return axios.get(`/api/dataById/${crudKey}/${id}`).then(res => res.data);
    },

    getIframeUrl(id: number) {
        return axios.post(`https://bazon.cc/api/search?token=bce8657689768d977a79f50bf14a86a6&kp=${id}`).then(res => res.data);
    }
};

