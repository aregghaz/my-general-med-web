import { InferActionsTypes } from "./store";

const defaultDat = {
    // client_id:0,
    // car_id:0,
    // vendor_id:0,
    trip_id: 0,
    fullName: "",
    gender: "",
    car: {
        id: 0,
        value: "",
        label: ""
    },
    pick_up_address: "",
    los: "",
    phone_number: "",
    date_of_service: "",
    appointment_time: "",
    pick_up: "",
    drop_down: "",
    request_type: 0,
    type_id: {
        id: 0,
        value: "",
        label: "",
        slug: ""
    },
    address : [{
        address: '',
        address_comments: '',
        address_phone: "",
        pick_up:'00:00',
        drop_down:'00:00',
        step:0
    }],
    height: 0,
    weight: 0,
    escortType: 0,
    type_of_trip: 0,
    miles: 0,
    member_uniqie_identifer: 0,
    waitDuration: "",
    oxygen: "",
    birthday: 0,
    additionalNote: "",
    operator_note: ""
};

const initialState = {
    clientById: defaultDat
};


type InitialState = typeof initialState
type clientAction = InferActionsTypes<typeof clientAction>

const clientReducer = (state = initialState, action: clientAction): InitialState => {

    switch (action.type) {
        case "FETCHING_CLIENT_DATA":
            return {
                ...state,
                clientById: action.payload.clientById
            };

        case "RESET_HOME_PAGE_STATE":
            return {
                ...state,
                clientById: defaultDat

            };
        default:
            return state;
    }

};


export const clientAction = {
    fetching: (data: InitialState) => ({ type: "FETCHING_CLIENT_DATA", payload: data } as const),
    resetState: () => ({ type: "RESET_HOME_PAGE_STATE" } as const)
};


export default clientReducer;
