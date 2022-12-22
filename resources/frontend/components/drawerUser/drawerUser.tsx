import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import HomeIcon from '-!svg-react-loader!../../images/home.svg'
import Account from '-!svg-react-loader!../../images/account.svg'
import Logout from '-!svg-react-loader!../../images/logout.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'

import s from './drawerUser.module.scss'
import {setLogOut} from "../../store/auth";
import ColumnsHideShow from '../columns-hide-show/columns-hide-show'

import ColumnSvg from '-!svg-react-loader!../../images/column.svg'
const DrawerUser: React.FC = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlerLogOut = () => dispatch(setLogOut());
    const [show, setShow] = useState(false)
    const filterColumns = () => {
        setShow(!show)
        console.log(show)
    }
    return (
        <>
            <nav className={s.headerNav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div key={'home'} className={s.iconBlock}>
                            <Button type={'blank'}>
                                <span className={s.icon}>
                                    <HomeIcon/>
                                </span>
                            </Button>
                        </div>
                        {/* <div className={`${s.account} ${s.iconBlock}`}>
                            <Button type={'blank'} className={s.personalInfo}>
                                <span className={s.icon}>
                                    <Account/>
                                </span>
                            </Button>
                        </div> */}
                    </div>
              
                    <div className={s.iconBlock}>
                        <Button type={'blank'} onClick={() => {
                            handlerLogOut()
                            navigate('/')
                        }}>
                            <span className={s.icon}>
                                <Logout/>
                            </span>
                        </Button>
                    </div>
                </div>
            </nav>
            <nav className={`${s.root} ${s.fixed}`}>
                <ul className={s.list}>

                </ul>
            </nav>

        </>
    )
}


export default DrawerUser
