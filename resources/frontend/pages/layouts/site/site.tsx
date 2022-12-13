import React, {useEffect} from 'react'
import Footer from '../footer/footer'
import {checkLoggedIn} from '../../../store/auth'
import {useDispatch} from 'react-redux'

import s from './site.module.scss'
import Drawer from "../../../components/drawer/drawer";
import {Col, Row} from 'react-grid-system'

interface ISite {
    path: string
}


const Site: React.FC<ISite> = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLoggedIn())
    }, [])

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
