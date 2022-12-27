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

const DrawerUser: React.FC = () => {
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
    // const openSearch = () => {
    //     setOpen(!open)
    // }
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
                            {/*<div*/}
                            {/*    className={`${s.header_input_block} ${open ? s.active : s.passive}`}*/}
                            {/*    // style={open ? {height: "30px", minWidth: "500px", overflow: "hidden"} : {*/}
                            {/*    //     height: "30px",*/}
                            {/*    //     width: 0,*/}
                            {/*    //     overflow: "hidden"*/}
                            {/*    // }}*/}
                            {/*>*/}
                            {/*    <Input name={'search'}*/}
                            {/*           type={'text'}*/}
                            {/*        ////FIXME*/}
                            {/*        //    onBlur={onSerachInput}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className={s.iconBlock}>*/}
                            {/*    <Button type={'blank'} onClick={() => {*/}
                            {/*        openSearch()*/}
                            {/*    }}>*/}
                            {/*    <span className={s.icon}>*/}
                            {/*        {open ? <Close/> : <Search/>}*/}
                            {/*    </span>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
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
            <nav className={`${s.root} ${s.fixed}`}>
                <ul className={s.list}>

                </ul>
            </nav>

        </>
    )
}


export default DrawerUser
