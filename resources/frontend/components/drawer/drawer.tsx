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
import MenuBar from '-!svg-react-loader!../../svgs/menuBar.svg';
import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";
import ColumnsHideShow from "../columns-hide-show/columns-hide-show";
import Dropdown from '../dropdown/dropdown'


const menuItemsFirst = [

    {
        Icon: <HomeIcon/>,
        item: 'Home',
        page: '/admin'
    },
    {
        Icon: <Users/>,
        item: 'vendors',
        page: '/admin/vendors'
    },
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

const Drawer: React.FC = ({ children,isOpen, handleToggle }:any) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /// const [show, setShow] = useState(false)
    const handlerLogOut = () => dispatch(setLogOut());
    // const filterColumns = () => {
    //     setShow(!show)
    //     console.log(show)
    // }

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
                <div style={{width: "100%", maxWidth:"calc(100% - 290px)"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Drawer
