import { InferActionsTypes } from "./store";

const initialState = {
    driverCount: 0 as number,
    carCount: 0 as number,
    patientCount: 0 as number,
    tripsCount: 0 as number,
    data: [] as Array<any>
};

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actionsNotify>

const NotifyReducer = (state = initialState, action: Actions): InitialState => {


    switch (action.type) {
        case "FETCHING_NOTIFICATION_COUNT":
            return {
                ...state,
                data:action.payload.data,
                driverCount: action.payload.driverCount,
                carCount: action.payload.carCount,
                patientCount: action.payload.patientCount,
                tripsCount: action.payload.tripsCount,
            };
        case "RESET_TAB_ID":
            return {
                ...state,
                data: [],
                tripsCount: 0,
                patientCount: 0,
                carCount: 0,
                driverCount: 0,
            };
        default:
            return state;
    }

};


export const actionsNotify = {
    fetching: (data: InitialState) => ({ type: "FETCHING_NOTIFICATION_COUNT", payload: data } as const),
    resetState: () => ({ type: "RESET_TAB_ID" } as const)
};


export default NotifyReducer;

