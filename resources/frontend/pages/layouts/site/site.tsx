import React, {useEffect, useState} from 'react'
import {checkLoggedIn} from '../../../store/auth'
import {useDispatch, useSelector} from 'react-redux'
import s from './site.module.scss'
import {Col, Row} from 'react-grid-system'
import { getUserData} from '../../../store/selectors'
import {navigate} from '@reach/router'
import Drawer from "../../../components/drawer/drawer";
import { toast, ToastContainer } from "react-toastify";
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

interface ISite {
    path: string
}

const Site: React.FC<ISite> = ({children}) => {

    const dispatch = useDispatch()
    const {user,loggedIn} = useSelector(getUserData)
    const [isLoading, setLoading] = useState(true);
    //
    useEffect(() => {
        dispatch(checkLoggedIn())
    }, [])


    return loggedIn && (
        <Row className={s.mainRow}>
            <div className={s.notificationDiv}>
                <ToastContainer/>
            </div>
            <Drawer>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.mainContainer}>
                {children}
            </Col>
            </Drawer>
        </Row>
    )

}
export default Site
