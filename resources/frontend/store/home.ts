import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import { IClientsData } from '../types/home-types';
import {ICount} from '../types/admin'
const initialState = {
    data: [] as Array<IClientsData>,
    pagination:  {from : 0,
        to :0}
}


type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case 'FETCHING_HOME_PAGE_DATA':
            return {
                ...state,
                data: [...action.payload.data],
                pagination: action.payload.pagination,

            }
        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                data: [],
                pagination: {from : 0,
                    to :0},
            }
        default:
            return state
    }

}


export const actions = {
    fetching: (data: InitialState) => ({type: 'FETCHING_HOME_PAGE_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_HOME_PAGE_STATE'} as const)
}


export default homeReducer
