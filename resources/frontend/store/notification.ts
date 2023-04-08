import { InferActionsTypes } from "./store";

const initialState = {
    count: 0 as number
};

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actionsNotification>

const NotificationReducer = (state = initialState, action: Actions): InitialState => {


    switch (action.type) {
        case "FETCHING_NOTIFICATION_COUNT":
            return {
                count: action.payload.count
            };
        case "RESET_TAB_ID":
            return {
                count: 0
            };
        default:
            return state;
    }

};


export const actionsNotification = {
    fetching: (data: InitialState) => ({ type: "FETCHING_NOTIFICATION_COUNT", payload: data } as const),
    resetState: () => ({ type: "RESET_TAB_ID" } as const)
};


export default NotificationReducer;

