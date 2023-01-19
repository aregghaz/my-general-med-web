import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import HomeIcon from "-!svg-react-loader!../../images/home.svg";
import Account from "-!svg-react-loader!../../images/User.svg";
import Logout from "-!svg-react-loader!../../images/SignOut.svg";
import Status from "-!svg-react-loader!../../images/Status.svg";
import UserRole from "-!svg-react-loader!../../images/UserRole.svg";
import Clients from "-!svg-react-loader!../../images/Clients.svg";
import Users from "-!svg-react-loader!../../images/Users.svg";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "@reach/router";
import Bars from "-!svg-react-loader!../../images/Bars.svg";
import Close from "-!svg-react-loader!../../images/Close.svg";
import s from "./drawer.module.scss";
import { setLogOut } from "../../store/auth";

const menuItemsFirst = [

    {
        id: 1,
        Icon: <HomeIcon />,
        item: "Home",
        page: "/admin"
    },
    {
        id: 2,
        Icon: <Users />,
        item: "vendors",
        page: "/admin/vendors"
    },
    // {
    //     id: 3,
    //     Icon: <Users/>,
    //     item: 'adminBeneficiaries',
    //     page: '/admin/users'
    // },
    {
        id: 4,
        Icon: <Clients />,
        item: "clients",
        page: "/admin/clients"
    },
    {
        id: 5,
        Icon: <Status />,
        item: "status",
        page: "/admin/status"
    },
    {
        id: 6,
        Icon: <UserRole />,
        item: "role",
        page: "/admin"
    }

];

const Drawer: React.FC = ({ children, isOpen, handleToggle }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);
    const [defaultChecked, setDefaultChecked] = useState<number>(menuItemsFirst[0].id);
    const handlerLogOut = () => dispatch(setLogOut());
    // const filterColumns = () => {
    //     setShow(!show)
    //     console.log(show)
    // }

    const openSideBar = () => setShow(!show);

    const changeSideBar = (id: number) => {
        setDefaultChecked(id);
    };

    return (
        <div style={{ width: "100%" }}>
            <nav className={s.header_nav}>
                <div className={s.logoSection}>
                    <div className={s.logoDiv}>
                        <img src={`../../images/logo.png`} alt="logo" />
                    </div>

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


                <div className={s.icon_left_block}>
                    <div className={s.iconBlock}>
                        <Button type={"blank"}>
                    <span className={s.icon}>
                        <Account />
                    </span>
                        </Button>
                    </div>
                    <div className={s.iconBlock}>
                        <Button type={"blank"} onClick={() => {
                            handlerLogOut();
                            navigate("/");
                        }}>
                    <span className={s.icon}>
                        <Logout />
                    </span>
                        </Button>
                    </div>
                </div>
            </nav>
            <div className={s.content_part}>
                <nav className={s.main} style={show ? { width: "200px" } : { width: "50px" }}>
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map(li => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link
                                                to={li.page}
                                                className={`${s.link} ${defaultChecked === li.id ? s.active_icon : " "}`}
                                                onClick={() => changeSideBar(li.id)}
                                            >
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
                    style={!show ? { maxWidth: "calc(100% - 50px)" } : { maxWidth: "calc(100% - 200px)" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Drawer;
