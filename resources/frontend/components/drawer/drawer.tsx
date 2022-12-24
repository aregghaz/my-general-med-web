import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import HomeIcon from '-!svg-react-loader!../../images/home.svg'
import Account from '-!svg-react-loader!../../images/User.svg'
import Logout from '-!svg-react-loader!../../images/SignOut.svg'
import Status from '-!svg-react-loader!../../images/Status.svg'
import UserRole from '-!svg-react-loader!../../images/UserRole.svg'
import Actions from '-!svg-react-loader!../../images/Actions.svg'
import Clients from '-!svg-react-loader!../../images/Clients.svg'
import Users from '-!svg-react-loader!../../images/Users.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'

import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";
import ColumnsHideShow from "../columns-hide-show/columns-hide-show";


const menuItemsFirst = [

    {
        Icon: <HomeIcon/>,
        item: 'Home',
        page: '/admin'
    },
    {
        Icon: <Users/>,
        item: 'adminBeneficiaries',
        page: '/admin/users'
    },
    {
        Icon: <Clients/>,
        item: 'clients',
        page: '/admin/clients'
    },
    {
        Icon: <Status/>,
        item: 'status',
        page: '/admin/vendors'
    },
    {
        Icon: <UserRole/>,
        item: 'role',
        page: '/admin'
    },
    {
        Icon: <Actions/>,
        item: 'actions',
        page: '/admin'
    },
]

const Drawer: React.FC = ({children}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /// const [show, setShow] = useState(false)
    const handlerLogOut = () => dispatch(setLogOut());
    return (
        <div style={{width: "100%"}}>
            <nav className={s.header_nav}>
                <div className={s.iconBlock}>
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
            </nav>
            <div className={s.content_part}>
                <nav className={s.main}>
                    <div className={s.side_panel}></div>
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map(li => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link to={li.page} className={s.link}>
                                                <span className={s.side_icon}>
                                                    {li.Icon}
                                                </span>
                                                <span>
                                                    {t(`${li.item}`)}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                )
                        }
                    </ul>
                </nav>
                <div style={{width: "100%"}}>
                    <div style={{
                        border: "1px solid grey",
                        width: "calc(100% - 20px)",
                        minHeight: "100px",
                        borderRadius: "4px",
                        padding: "10px",
                        margin: "10px auto",
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <div>drivers</div>
                            <div>vendors</div>
                            <div>operators</div>
                            <div>admin</div>
                        </div>
                        <div>
                            <div>create</div>
                            <div>
                                <div></div>
                                <div>*</div>
                                <div>*</div>
                                <div>*</div>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Drawer
