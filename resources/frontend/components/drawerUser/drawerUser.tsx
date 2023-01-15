import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'
import s from './drawerUser.module.scss'
import {setLogOut} from "../../store/auth";
import Bars from '-!svg-react-loader!../../images/Bars.svg'
import Close from '-!svg-react-loader!../../images/Close.svg'
import Account from '-!svg-react-loader!../../images/User.svg'
import Logout from '-!svg-react-loader!../../images/SignOut.svg'
import Settings from '-!svg-react-loader!../../images/Settings.svg'
import Clients from '-!svg-react-loader!../../images/Clients.svg'
import Users from '-!svg-react-loader!../../images/Users.svg'
import Cars from '-!svg-react-loader!../../images/Car.svg'

const DrawerUser: React.FC = ({children}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handlerLogOut = () => dispatch(setLogOut());
    const openAccountMenu = () => setMenuOpen(!menuOpen);
    const openSideBar = () => setIsOpen(!isOpen);

    const menuItemsFirst = [
        {
            Icon: <Clients/>,
            item: 'clients',
            page: '/'
        },
        {
            Icon: <Users/>,
            item: 'Users',
            page: '/users'
        },
        {
            Icon: <Cars/>,
            item: 'Cars',
            page: '/cars'
        }

    ]
    return (
        <>
            <nav className={s.header_nav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div>
                            <div
                                key={'home'}
                                className={s.iconBlock}
                                style={{paddingLeft: "30px"}}
                            >
                                <Button
                                    type={'blank'}
                                    onClick={openSideBar}
                                >
                                <span className={s.icon}>
                                    {isOpen ? <Close/> : <Bars/>}
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
                                <Button
                                    type={'blank'}
                                    className={s.personalInfo}
                                    onClick={openAccountMenu}
                                >
                                <span className={s.icon}>
                                    <Account/>
                                </span>
                                </Button>
                                {
                                    menuOpen &&
                                    <div className={s.account_drop_menu}>
                                        <div className={s.iconBlock}>
                                            <Button
                                                type={'blank'}
                                                onClick={() => {
                                                    handlerLogOut()
                                                    navigate('/')
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <Logout/>
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </div>

                            {/*<div className={s.iconBlock}>*/}
                            {/*    <Button*/}
                            {/*        type={'blank'}*/}
                            {/*        onClick={() => {*/}
                            {/*            handlerLogOut()*/}
                            {/*            navigate('/')*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <span className={s.icon}>*/}
                            {/*            <Logout/>*/}
                            {/*        </span>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                </div>
            </nav>
            <div className={s.content_part}>
                <nav className={s.main} style={isOpen ? {width: "200px"} : {width: "50px"}}>
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
                                                    {li.item}
                                                </span>
                                                </span>

                                            </Link>
                                        </li>
                                    )
                                )
                        }
                    </ul>
                </nav>
                <div className={s.main_content}
                     style={!isOpen ? {maxWidth: "calc(100% - 50px)"} : {maxWidth: "calc(100% - 200px)"}}>
                    {children}
                </div>
            </div>
        </>
    )
}


export default DrawerUser
