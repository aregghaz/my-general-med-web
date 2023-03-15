import axios from "axios";
import { IClintSendData } from "../../types/api";

export const OperatorApi = {
    getClientData(options: IClintSendData) {
        return axios.post(`/api/getClients`, options).then(res => res.data);
    }

};
