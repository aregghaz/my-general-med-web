import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import {IClientsData} from '../types/home-types';
import {ICount} from '../types/admin'

const initialState = {
    data: [] as Array<IClientsData>,
    pagination: {
        from: 0,
        to: 0
    },
    total: 0 as number,
    last_page: 0 as number,
    filtered_data: {} as IClientsData,
    titles: [] as string[]
}


const defaultDat = {
    id: 0,
    client_id: 0,
    driver_id: 0,
    surname: "string",
    name: "",
    drop_down_address: "",
    pick_up_address: "",
    apartament_number: "",
    birthday: "",
    email: "",
    id_number: 0,
    phone_number: "",
    status: 0,
}

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case 'FETCHING_HOME_PAGE_DATA':
            return {
                ...state,
                data: [...action.payload.data],
                total: action.payload.total,
                last_page: action.payload.last_page,
                pagination: action.payload.pagination,
            }
        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                data: [],
                total: 0,
                last_page: 0,
                pagination: {
                    from: 0,
                    to: 0
                },
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
