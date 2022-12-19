import React from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import HomeIcon from '-!svg-react-loader!../../images/home.svg'
import Account from '-!svg-react-loader!../../images/account.svg'
import Logout from '-!svg-react-loader!../../images/logout.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'

import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";


const menuItemsFirst = [

    {
        item: 'admin.adminBeneficiaries',
        page: '/admin/users'
    },

    {
        item: 'admin.clients',
        page: '/admin/clients'
    },
]

const Drawer: React.FC = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlerLogOut = () => dispatch(setLogOut());

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
                        <div className={`${s.iconBlock}`}>
                            <Button type={'blank'}>
                                <span className={s.icon}>
                                    <Account/>
                                </span>
                            </Button>
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
                </div>
            </nav>
            <nav className={`${s.root} ${s.fixed}`}>
                <ul className={s.list}>
                    {menuItemsFirst
                        .map(
                            (li) => (
                                <li key={`first-${li.item}`}>
                                    <Link to={li.page} className={s.link}>
                                        {t(`${li.item}`)}
                                    </Link>
                                </li>
                            )
                        )}
                </ul>
            </nav>

        </>
    )
}


export default Drawer
