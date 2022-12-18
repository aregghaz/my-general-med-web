import {combineReducers} from 'redux'
import homeReducer from './home'
import authReducer from './auth'
import serialsReducer from './moves'
import itemReducer from "./item";
import clientReducer from './client';


const reducers = combineReducers({
    homeReducer,
    authReducer,
    serialsReducer,
    itemReducer,
    clientReducer,
})
export type ReducerType = typeof reducers

export default reducers

