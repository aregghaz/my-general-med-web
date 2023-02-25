import {combineReducers} from 'redux'
import homeReducer from './home'
import authReducer from './auth'
import serialsReducer from './moves'
import itemReducer from "./item";
import clientReducer from './client';
import adminUsersReducer from "./adminUser";
import adminVendorUsersReducer from "./vendorUsers";
import tabsReducer from "./tab";


const reducers = combineReducers({
    homeReducer,
    authReducer,
    serialsReducer,
    itemReducer,
    clientReducer,
    adminUsersReducer,
    adminVendorUsersReducer,
    tabsReducer,
})
export type ReducerType = typeof reducers

export default reducers

