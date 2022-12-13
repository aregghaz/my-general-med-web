import {BaseThunkType, InferActionsTypes} from './store'
import {IError, IUser} from '../types/auth'
import axios from 'axios'
import {Dispatch} from 'redux'
import {authAPI} from '../api/site-api/auth-api'
import {navigate} from '@reach/router'

const initialState = {
    user: null as IUser | null,
    token: '',
    loggedIn: 0,
    error: null as null | IError
}

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<Actions>


const authReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'SET_LOGGED_IN_AND_TOKEN': {
            return {
                ...state,
                token: action.payload,
                loggedIn: 1
            }
        }
        case 'SETTING_USER_DATA': {
            return {
                ...state,
                user: {
                    ...action.payload,
                    languages: [...action.payload.languages],
                    description: [...action.payload.description]
                },
                loggedIn: 1,
                error: null
            }
        }
        case 'LOG_OUT_USER': {
            return {
                ...state,
                loggedIn: 0,
                token: '',
                user: null
            }
        }
        case 'SET_LOGIN_ERROR': {
            return {
                ...state,
                error: {
                    ...state.error,
                    email: 'Please enter a valid email',
                    password: 'Please enter a valid password'
                }
            }
        }
        default:
            return state
    }
}

export const checkLoggedIn = (): ThunkType => async (dispatch) => {
    try {
        const token = localStorage.getItem('access_token') || ''
        if (token) {
            dispatch(actions.setLoggedIn(token))
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token
                return config
            })
            await dispatch(getUserData())
        }
    } catch (e) {
        console.error(e)
    }
}

export const checkAdminLoggedIn = ():ThunkType => async (dispatch) =>{
    try {
        const token = localStorage.getItem('access_token') || ''
        if (token) {
            dispatch(actions.setLoggedIn(token))
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token
                return config
            })
            await dispatch(getUserData())
        } else {
             return  navigate('/admin-login')
        }
    }
    catch (e) {
        console.error(e)
    }
}


export const login = (formData: FormData): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(formData)

            if (response.status === 200) {
                axios.interceptors.request.use(function (config) {
                    config.headers.Authorization = 'Bearer ' + response.data.access_token
                    return config
                })
                if (response.data) {
                    dispatch(actions.setLoggedIn(response.data.access_token))
                    localStorage.setItem('access_token', response.data.access_token)

                    await dispatch(getUserData())
                }
            }
        } catch (e) {
            dispatch(actions.setError(e))
            console.error(e)

        }
    }
}


export const getUserData = (): ThunkType => async (dispatch) => {
    try {
        const user = await authAPI.getUser()
        dispatch(actions.setUser(user))
    } catch (e) {
        console.error(e)
    }
}

export const setLogOut = () => (dispatch: Dispatch) => {
    localStorage.removeItem('access_token')
    dispatch(actions.logOut())
}


export const actions = {
    setLoggedIn: (token: string) => ({type: 'SET_LOGGED_IN_AND_TOKEN', payload: token} as const),
    setUser: (user: IUser) => ({type: 'SETTING_USER_DATA', payload: user} as const),
    logOut: () => ({type: 'LOG_OUT_USER'} as const),
    setError: (e: Error) => ({type: 'SET_LOGIN_ERROR', payload: e} as const)
}


export default authReducer