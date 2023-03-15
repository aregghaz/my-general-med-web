import { combineReducers } from "redux";
import homeReducer from "./home";
import authReducer from "./auth";
import itemReducer from "./item";
import clientReducer from "./client";
import adminUsersReducer from "./adminUser";
import adminVendorUsersReducer from "./vendorUsers";
import tabsReducer from "./tab";
import NotificationReducer from "./notification";


const reducers = combineReducers({
    homeReducer,
    authReducer,
    itemReducer,
    clientReducer,
    adminUsersReducer,
    NotificationReducer,
    adminVendorUsersReducer,
    tabsReducer
});
export type ReducerType = typeof reducers

export default reducers;

