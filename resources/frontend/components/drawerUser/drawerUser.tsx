import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import HomeIcon from '-!svg-react-loader!../../images/home.svg'
import Account from '-!svg-react-loader!../../images/User.svg'
import Logout from '-!svg-react-loader!../../images/SignOut.svg'
import Settings from '-!svg-react-loader!../../images/Settings.svg'
// import Search from '-!svg-react-loader!../../images/Search.svg'
// import Close from '-!svg-react-loader!../../images/Close.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'

import s from './drawerUser.module.scss'
import {setLogOut} from "../../store/auth";
import ColumnsHideShow from '../columns-hide-show/columns-hide-show'

import ColumnSvg from '-!svg-react-loader!../../images/column.svg'
import Input from "../input/input";
//import Logout from '-!svg-react-loader!../../images/SignOut.svg'
import Status from '-!svg-react-loader!../../images/Status.svg'
import UserRole from '-!svg-react-loader!../../images/UserRole.svg'
import Actions from '-!svg-react-loader!../../images/Actions.svg'
import Clients from '-!svg-react-loader!../../images/Clients.svg'
const DrawerUser: React.FC = ({children}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlerLogOut = () => dispatch(setLogOut());
    const [show, setShow] = useState(false)
    // const [open, setOpen] = useState(false)
    const filterColumns = () => {
        setShow(!show)
        console.log(show)
    }
    const menuItemsFirst = [

        {
            Icon: <HomeIcon/>,
            item: 'Home',
            page: '/admin'
        },
        // {
        //     Icon: <Users/>,
        //     item: 'vendors',
        //     page: '/admin/vendors'
        // },
        // {
        //     Icon: <Users/>,
        //     item: 'adminBeneficiaries',
        //     page: '/admin/users'
        // },
        {
            Icon: <Clients/>,
            item: 'clients',
            page: '/admin/clients'
        },
        {
            Icon: <Status/>,
            item: 'status',
            page: '/admin/status'
        },
        {
            Icon: <UserRole/>,
            item: 'role',
            page: '/admin'
        },
    
    ]
    return (
        <>
            <nav className={s.header_nav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div>
                            <div key={'home'} className={s.iconBlock} style={{paddingLeft: "30px"}}
                                 onClick={() => alert(5)}>
                                <Button type={'blank'}>
                                <span className={s.icon}>
                                    <HomeIcon/>
                                </span>
                                </Button>
                            </div>
                        </div>

                        <div className={s.header_icons_block}>
                    
                            <div className={s.iconBlock}>
                                <Button type={'blank'}>
                                <span className={s.icon}>
                                    <Settings/>
                                </span>
                                </Button>
                            </div>
                            <div className={`${s.account} ${s.iconBlock}`}>
                                <Button type={'blank'} className={s.personalInfo}>
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
                                        
                                            </Link>
                                        </li>
                                    )
                                )
                        }
                    </ul>
                </nav>
                <div className={s.body} style={{width: "100%", maxWidth:"calc(100% - 90px)", display:'inline-block'}}>
                    {children}
                </div>
            </div>
        </>
    )
}


export default DrawerUser
