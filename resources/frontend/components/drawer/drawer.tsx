import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import HomeIcon from '-!svg-react-loader!../../images/home.svg'
import Account from '-!svg-react-loader!../../images/account.svg'
import Logout from '-!svg-react-loader!../../images/logout.svg'
import ColumnSvg from '-!svg-react-loader!../../images/column.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'

import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";
import ColumnsHideShow from "../columns-hide-show/columns-hide-show";


const menuItemsFirst = [

    {
        item: 'adminBeneficiaries',
        page: '/admin/users'
    },

    {
        item: 'clients',
        page: '/admin/clients'
    },
    {
        item: 'vendors',
        page: '/admin/vendors'
    },
]

const Drawer: React.FC = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const handlerLogOut = () => dispatch(setLogOut());
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
                        <div className={s.iconBlock}>
                            <Button type={'blank'}>
                                <span className={s.icon}>
                                    <Account/>
                                </span>
                            </Button>
                        </div>
                        <div className={s.iconBlock}>
                            <Button type={'blank'}>
                                <span className={s.icon} onClick={filterColumns}>
                                   <ColumnSvg/>
                                </span>
                            </Button>
                            <ColumnsHideShow show={show}/>
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
