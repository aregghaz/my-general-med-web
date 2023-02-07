import {InferActionsTypes} from './store'

const initialState = {
    userdata: [] as Array<any>,
    operatorsCount:0 as number,
    driversCount:0 as number

}

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const adminVendorUsersReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case 'FETCHING_ADMIN_USERS_PAGE_DATA':
            return {
                ...state,
                userdata: action.payload.userdata,
                operatorsCount: action.payload.operatorsCount,
                driversCount:  action.payload.driversCount,
            }
        case 'RESET_FETCHING_ADMIN_USERS_PAGE_DATA_STATE':
            return {
                ...state,
                userdata: [],
                operatorsCount: 0,
                driversCount: 0
            }

        default:
            return state
    }

}


export const actions = {
    fetching: (data: InitialState) => ({type: 'FETCHING_ADMIN_USERS_PAGE_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_FETCHING_ADMIN_USERS_PAGE_DATA_STATE'} as const),
}


export default adminVendorUsersReducer
