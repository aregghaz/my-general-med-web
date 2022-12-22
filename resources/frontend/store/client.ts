import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import { IClientsData } from '../types/home-types';
import {ICount} from '../types/admin'
const defaultDat ={
    // client_id:0,
    // car_id:0,
    // vendor_id:0,
    trip_id:0,
    name:"",
    surname:'',
    gender:"",
    pick_up_address:"",
    los:"",
    phone_number:"",
    date_of_service:"",
    appointment_time:"",
    pick_up:"",
    drop_down:"",
    request_type: 0,
    status:0,
    origin_name:"",
    origin_stree:"",
    origin_suite:"",
    origin_city:"",
    origin_state:"",
    origin_postal:"",
    origin_country:"",
    origin_phone:"",
    origin_comment:'',
    destination_name:'',
    destination_street:'',
    destination_suite:'',
    destination_city:'',
    destination_state:'',
    destination_postal:'',
    destination_country:'',
    destination_phone:'',
    destination_comment:'',
    escortType:0,
    type_of_trip:0,
    miles:0,
    member_uniqie_identifer:0,
    birthday:0

  
}

const initialState = {
    show:0 ,
    data: [typeof defaultDat]
}


type InitialState = typeof initialState
type clientAction = InferActionsTypes<typeof clientAction>

const clientReducer = (state = initialState, action: clientAction): InitialState => {

    switch (action.type) {
        case 'FETCHING_CLIENT_DATA':
            return {
                ...state,
                data: action.payload.data,
                show: action.payload.show,

            }

        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                show:0,
                data:[typeof defaultDat],
            
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
