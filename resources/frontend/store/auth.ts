import {BaseThunkType, InferActionsTypes} from './store'
import {IError, IUser} from '../types/auth'
import axios from 'axios'
import {Dispatch} from 'redux'
import {authAPI} from '../api/site-api/auth-api'
import {navigate} from '@reach/router'
import {homeAPI} from '../api/site-api/home-api'

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
            await dispatch(getUserData())
        }
    } catch (e) {
        console.error(e)
    }
}

export const checkAdminLoggedIn = (): ThunkType => async (dispatch) => {
    try {
        const token = localStorage.getItem('access_token') || ''
        if (token) {
            dispatch(actions.setLoggedIn(token))
            await dispatch(getUserData())
        } else {
            return navigate('/login')
        }
    } catch (e) {
        console.error(e)
    }
}


export const login = (formData: FormData): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(formData)

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token

            if (response.status === 200) {
                if (response.data) {
                    dispatch(actions.setLoggedIn(response.data.access_token))
                    localStorage.setItem('access_token', response.data.access_token)

                    try {
                        // console.log(response.data.access_token, ' ---- 111 token ')
                        const user = await authAPI.getUser()
                        dispatch(actions.setUser(user))
                    } catch (e) {
                        console.error(e)
                    }
                    ///  await dispatch(getUserData())
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

export const setLogOut = () => async (dispatch: Dispatch) => {
    localStorage.removeItem('access_token')
    dispatch(actions.logOut())
    await authAPI.logout()

}


export const actions = {
    setLoggedIn: (token: string) => ({type: 'SET_LOGGED_IN_AND_TOKEN', payload: token} as const),
    setUser: (user: IUser) => ({type: 'SETTING_USER_DATA', payload: user} as const),
    logOut: () => ({type: 'LOG_OUT_USER'} as const),
    setError: (e: Error) => ({type: 'SET_LOGIN_ERROR', payload: e} as const)
}


export default authReducer
