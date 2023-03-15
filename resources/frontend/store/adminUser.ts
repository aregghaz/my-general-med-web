import { InferActionsTypes } from "./store";

const initialState = {
    userdata: [] as Array<any>,
    operatorCount: 0 as number,
    vendorCount: 0 as number

};

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const adminUsersReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case "FETCHING_ADMIN_USERS_PAGE_DATA":
            return {
                ...state,
                userdata: action.payload.userdata,
                operatorCount: action.payload.operatorCount,
                vendorCount: action.payload.vendorCount
            };
        case "RESET_FETCHING_ADMIN_USERS_PAGE_DATA_STATE":
            return {
                ...state,
                userdata: [],
                operatorCount: 0,
                vendorCount: 0
            };

        default:
            return state;
    }

};


export const actions = {
    fetching: (data: InitialState) => ({ type: "FETCHING_ADMIN_USERS_PAGE_DATA", payload: data } as const),
    resetState: () => ({ type: "RESET_FETCHING_ADMIN_USERS_PAGE_DATA_STATE" } as const)
};


export default adminUsersReducer;
