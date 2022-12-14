import React, {useEffect, useState} from 'react'
import Footer from '../footer/footer'
import {checkLoggedIn} from '../../../store/auth'
import {useDispatch, useSelector} from 'react-redux'

import s from './site.module.scss'
import Drawer from "../../../components/drawer/drawer";
import {Col, Row} from 'react-grid-system'
import { getAdminData, getUserData } from '../../../store/selectors'
import { navigate } from '@reach/router'

interface ISite {
    path: string
}


const Site: React.FC<ISite> = ({children}) => {
   
    const dispatch = useDispatch()
    const {loggedIn} = useSelector(getAdminData)
    const {user} = useSelector(getUserData)
    const [isLoading, setLoading] = useState(true);
    console.log(user,loggedIn,'aaaaaaaaaaaaa')
    useEffect(() => {
        dispatch(checkLoggedIn())
    }, [])
  
    useEffect(() => {
        console.log(loggedIn,'22222222222')
        if(loggedIn){
            console.log(user && user.role == 'driver','22222222222')
            if(user && user.role == 'driver'){
                navigate('/')
            }
            if(user && user.role !== 'driver'){
                navigate('/admin-login')
              ///  setLoading(false)
            }
        }else{
            navigate('/admin-login')
        }
    }, [user])
    return (
        <Row className={s.mainRow}>
            <Drawer/>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.mainContainer}>
                {children}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Footer/>
            </Col>
        </Row>
    )

}
export default Site
