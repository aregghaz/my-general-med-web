import { InferActionsTypes } from "./store";
import { ISerialCard } from "../types/serial";
import { IOption } from "../components/select/select";

const initialState = {
    tabId: 1 as number,
};

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actionsTabs>

const tabsReducer = (state = initialState, action: Actions): InitialState => {


    switch (action.type) {
        case "FETCHING_TAB_ID":
            return {
                ...state,
                tabId: action.payload.tabId,
            };
        case "RESET_TAB_ID":
            return {
                ...state,
                tabId: 1,
            };
        default:
            return state;
    }

};


export const actionsTabs = {
    fetching: (data: InitialState) => ({ type: "FETCHING_TAB_ID", payload: data } as const),
    resetState: () => ({ type: "RESET_TAB_ID" } as const)
};


export default tabsReducer;

