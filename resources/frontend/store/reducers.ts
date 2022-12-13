import {combineReducers} from 'redux'
import homeReducer from './home'
import authReducer from './auth'
import serialsReducer from './moves'
import itemReducer from "./item";


const reducers = combineReducers({
    homeReducer,
    authReducer,
    serialsReducer,
    itemReducer,
})
export type ReducerType = typeof reducers

export default reducers

