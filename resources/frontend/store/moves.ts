import {InferActionsTypes} from './store'
import {ISerialCard} from "../types/serial";
import {IOption} from "../components/select/select";

const initialState = {
    data: [] as Array<ISerialCard>,
    category: [] as Array<IOption>,
}

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const movesReducer = (state = initialState, action: Actions): InitialState => {


    switch (action.type) {
        case 'FETCHING_MOVES_PAGE_DATA':
            return {
                ...state,
                data: [...action.payload.data],
                category: [...action.payload.category],
            }
        case 'RESET_MOVES_PAGE_STATE':
            return {
                ...state,
                data: [],
                category: [],
            }
        default:
            return state
    }

}


export const actions = {
    fetching: (data: InitialState) => ({type: 'FETCHING_MOVES_PAGE_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_MOVES_PAGE_STATE'} as const)
}


export default movesReducer
