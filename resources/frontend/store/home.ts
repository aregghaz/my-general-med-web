import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import {IClientsData} from '../types/home-types';
import {ICount} from '../types/admin'

const initialState = {
    data: [] as Array<typeof defaultDat>,
    // pagination: {
    //     from: 0,
    //     to: 0
    // },
    // total: 0 as number,
    // last_page: 0 as number,



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

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case 'FETCHING_HOME_PAGE_DATA':
            return {
                ...state,
                data: [...action.payload.data],
                // total: action.payload.total,
                // last_page: action.payload.last_page,
              ///  pagination: action.payload.pagination,
            }
        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                data: [],
                // total: 0,
                // last_page: 0,
                // pagination: {
                //     from: 0,
                //     to: 0
                // },
            }

        case 'FILTER_COLUMNS_DATA':
            return {
                ...state,
                filtered_data: action.payload
            }


        case 'SET_TITLES':
            return {
                ...state,
                titles: action.payload
            }

        case 'RESET_FILTER_DATA':
            return {
                ...state,
                filtered_data: {}
            }

        default:
            return state
    }

}


export const actions = {
    fetching: (data: InitialState) => ({type: 'FETCHING_HOME_PAGE_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_HOME_PAGE_STATE'} as const),
    filterColumns: (data: any) => ({type: 'FILTER_COLUMNS_DATA', payload: data} as const),
    setTitles: (data: any) => ({type: 'SET_TITLES', payload: data} as const),
    clearData: () => ({type: 'RESET_FILTER_DATA'} as const),
}


export default homeReducer
