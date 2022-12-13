import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Drawer from '../../../components/drawer/drawer'
import { checkAdminLoggedIn } from '../../../store/auth'

import s from './private-route.module.scss'

interface IPrivateRoute {
    path: string
}

const PrivateRoute: React.FC<IPrivateRoute> = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAdminLoggedIn())
    }, [])


    return (
            <>
                <Drawer/>
                <div className={s.root}>
                    {children}
                </div>
            </>
    )
}

export default PrivateRoute
