import React, {useEffect, useState} from 'react'
import Footer from '../footer/footer'
import {checkLoggedIn} from '../../../store/auth'
import {useDispatch, useSelector} from 'react-redux'

import s from './site.module.scss'
import DrawerUser from "../../../components/drawerUser/drawerUser";
import {Col, Row} from 'react-grid-system'
import {getAdminData, getUserData} from '../../../store/selectors'
import {navigate} from '@reach/router'

interface ISite {
    path: string
}


const Site: React.FC<ISite> = ({children}) => {

    const dispatch = useDispatch()

    const {loggedIn} = useSelector(getAdminData)
    const {user} = useSelector(getUserData)
    const [isLoading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     dispatch(checkLoggedIn())
    // }, [])

    useEffect(() => {
        dispatch(checkLoggedIn())
        if (loggedIn) {
            if (user && user.role == 'driver') {
                navigate('/')
            }
            if (user && user.role !== 'driver') {
                setLoading(false)
            }
        } else {
            navigate('/login')
        }
    }, [isLoading, loggedIn])
    return (
        <Row className={s.mainRow}>
            <DrawerUser>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.mainContainer}>
                {children}
            </Col>
            </DrawerUser>
        </Row>
    )

}
export default Site
