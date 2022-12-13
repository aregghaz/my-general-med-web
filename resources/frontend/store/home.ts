import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";

const initialState = {
    serials: [] as Array<ISerialCard>,
    moves: [] as Array<ISerialCard>,

}
type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case 'FETCHING_HOME_PAGE_DATA':
            return {
                ...state,
                serials: [...action.payload.serials],
                moves: [...action.payload.moves],

            }
        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                serials: [],
                moves: [],
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
