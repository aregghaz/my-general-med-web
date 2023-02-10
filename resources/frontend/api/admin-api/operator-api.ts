import axios from 'axios'

export const OperatorApi = {

    getClientData(options: IClintSendData) {
        return axios.post(`/api/getClients`,options).then(res => res.data)
    }
}
