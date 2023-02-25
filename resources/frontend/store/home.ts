import { InferActionsTypes } from "./store";
import { IClientsData } from "../types/home-types";
import { IOption } from "../components/select/select";

const initialState = {
    titles: [] as Array<IOption>,
    selectedTitle: [] as Array<IOption>,
    clients: [] as Array<IClientsData>,
    tripCount: 0 as number,
    availableCount: 0 as number,
    cancelCount: 0 as number,
    progressCount: 0 as number,
    doneCount: 0 as number

};

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {
        case "RESET_HOME_PAGE_STATE":
            return {
                ...state,
                titles: [],
                selectedTitle: [],
                clients: [],
                tripCount: 0,
                availableCount: 0,
                cancelCount: 0,
                progressCount: 0,
                doneCount: 0
            };

        case "SET_TITLES":
            return {
                ...state,
                titles: action.payload.titles,
                selectedTitle: action.payload.selectedTitle,
                clients: action.payload.clients,
                tripCount: action.payload.tripCount,
                availableCount: action.payload.availableCount,
                cancelCount: action.payload.cancelCount,
                progressCount: action.payload.progressCount,
                doneCount: action.payload.doneCount
            };


        default:
            return state;
    }

};


export const actions = {
    fetching: (data: InitialState) => ({ type: "FETCHING_HOME_PAGE_DATA", payload: data } as const),
    resetState: () => ({ type: "RESET_HOME_PAGE_STATE" } as const),
    setTitles: (data: InitialState) => ({ type: "SET_TITLES", payload: data } as const)
};


export default homeReducer;
