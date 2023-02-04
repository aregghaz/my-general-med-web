import {combineReducers} from 'redux'
import homeReducer from './home'
import authReducer from './auth'
import serialsReducer from './moves'
import itemReducer from "./item";
import clientReducer from './client';
import adminUsersReducer from "./adminUser";


const reducers = combineReducers({
    homeReducer,
    authReducer,
    serialsReducer,
    itemReducer,
    clientReducer,
    adminUsersReducer,
})
export type ReducerType = typeof reducers

export default reducers

