import {navigate} from '@reach/router'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Drawer from '../../../components/drawer/drawer'
import {checkAdminLoggedIn} from '../../../store/auth'
import {getAdminData, getUserData} from '../../../store/selectors'

import s from './private-route.module.scss'

interface IPrivateRoute {
    path: string
}

const PrivateRoute: React.FC<IPrivateRoute> = ({children}) => {
    const dispatch = useDispatch()

    const {loggedIn} = useSelector(getAdminData)
    const {user} = useSelector(getUserData)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(checkAdminLoggedIn())
    }, [])

    useEffect(() => {
        if (loggedIn) {
            if (user && user.role == 'driver') {
                navigate('/login')
            }
            if (user && user.role !== 'driver') {
                setLoading(false)
            }
        }else {
            navigate('/login')
        }

    }, [isLoading])
    return (
        <div className={s.root_wrapper}>
            <Drawer>
                <div className={s.root}>
                    {children}
                </div>
            </Drawer>
        </div>
    )
}

export default PrivateRoute
