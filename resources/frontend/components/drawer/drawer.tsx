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
import Bars from '-!svg-react-loader!../../images/Bars.svg';
import Close from '-!svg-react-loader!../../images/Close.svg';
import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";


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

const Drawer: React.FC = ({children, isOpen, handleToggle}: any) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState<boolean>(false)
    const handlerLogOut = () => dispatch(setLogOut());
    // const filterColumns = () => {
    //     setShow(!show)
    //     console.log(show)
    // }

    const openSideBar = () => setShow(!show);

    return (
        <div style={{width: "100%"}}>
            <nav className={s.header_nav}>
                <div
                    className={`${s.iconBlock} ${s.bars_lock}`}
                    onClick={openSideBar}
                >
                    <Button type={'blank'}>
                    <span className={s.icon}>
                        {show ? <Close/> : <Bars/>}
                    </span>
                    </Button>
                </div>
                <div className={s.icon_left_block}>

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
                </div>
            </nav>
            <div className={s.content_part}>
                <nav className={s.main} style={show ? {width: "200px"} : {width: "50px"}}>
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map(li => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link to={li.page} className={s.link}>
                                                <span className={s.link_block}>
                                                <span className={s.side_icon}>
                                                    {li.Icon}
                                                </span>
                                                <span className={s.side_text}>
                                                    {t(`${li.item}`)}
                                                </span>
                                                    </span>
                                            </Link>
                                        </li>
                                    )
                                )
                        }
                    </ul>
                </nav>
                <div
                    className={s.main_content}
                    style={!show ? {maxWidth: "calc(100% - 50px)"} : {maxWidth: "calc(100% - 200px)"}}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Drawer
