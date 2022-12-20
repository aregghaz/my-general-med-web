import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import { IClientsData } from '../types/home-types';
import {ICount} from '../types/admin'
const initialState = {
    show:false,
    clientData:{
        id : 0,
        client_id:0,
        driver_id:0,
        surname:"string",
        name:"",
        drop_down_address:"",
        pick_up_address:"",
        apartament_number:"",
        birthday:"",
        email:"",
        id_number:0,
        phone_number:"",
        status:0,
        ccn: 0,
        pick_up:'',
        drop_down:'',
    }
}


const defaultDat ={
    id : 0,
    client_id:0,
    driver_id:0,
    surname:"string",
    name:"",
    drop_down_address:"",
    pick_up_address:"",
    apartament_number:"",
    birthday:"",
    email:"",
    id_number:0,
    phone_number:"",
    status:0,
    ccn: 0,
    pick_up:'',
    drop_down:'',
}

type InitialState = typeof initialState
type clientAction = InferActionsTypes<typeof clientAction>

const clientReducer = (state = initialState, action: clientAction): InitialState => {

    switch (action.type) {
        case 'FETCHING_CLIENT_DATA':
            return {
                ...state,
                clientData: action.payload.clientData,
                show: action.payload.show,

            }
        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                show:false,
                clientData:defaultDat,
            
            }
        default:
            return state
    }

}


export const clientAction = {
    fetching: (data: InitialState) => ({type: 'FETCHING_CLIENT_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_HOME_PAGE_STATE'} as const)
}


export default clientReducer
