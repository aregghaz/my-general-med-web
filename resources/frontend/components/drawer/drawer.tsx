import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "@reach/router";
import s from "./drawer.module.scss";
import { setLogOut } from "../../store/auth";
import Bars from "-!svg-react-loader!../../images/Bars.svg";
import Close from "-!svg-react-loader!../../images/Close.svg";
import Account from "-!svg-react-loader!../../images/User.svg";
import Logout from "-!svg-react-loader!../../images/SignOut.svg";
import Settings from "-!svg-react-loader!../../images/Settings.svg";
import Clients from "-!svg-react-loader!../../images/Clients.svg";
import Users from "-!svg-react-loader!../../images/Users.svg";
import Cars from "-!svg-react-loader!../../images/Car.svg";
import ArrowDown from "-!svg-react-loader!../../svgs/arrow-down.svg";
import HomeIcon from "-!svg-react-loader!../../images/home.svg";
import Status from "-!svg-react-loader!../../images/Status.svg";
import UserRole from "-!svg-react-loader!../../images/UserRole.svg";
import { getUserData } from "../../store/selectors";

const Drawer: React.FC = ({ children }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutRef = useRef(null);
    const userData = useSelector(getUserData);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handlerLogOut = () => dispatch(setLogOut());
    const openAccountMenu = () => setMenuOpen(!menuOpen);
    const openSideBar = () => setIsOpen(!isOpen);
    const outsideClickHandler = (e: MouseEvent) => {
        if (logoutRef.current && !logoutRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", outsideClickHandler);

        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [logoutRef]);
    var menuItemsFirst: Array<{
        id: number,
        Icon: any,
        item: string,
        page: string
    }> = [];
    if (userData.user && userData.user.role == "vendor") {
        menuItemsFirst = [
            {
                id: 1,
                Icon: <Clients />,
                item: "clients",
                page: "/"
            },
            {
                id: 2,
                Icon: <Users />,
                item: "Users",
                page: "/users"
            },
            {
                id: 3,
                Icon: <Cars />,
                item: "Cars",
                page: "/cars"
            }
        ];
    } else if (userData.user && userData.user.role == "admin") {
        menuItemsFirst = [

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

    }

    const [activeIcon, setActiveIcon] = useState<number>(1);

    return (
        <>
            <nav className={s.header_nav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div className={s.logoSection}>
                            <div className={s.logoDiv}>
                                <img src={`../../images/logo.png`} alt="logo" />
                            </div>

                            <div
                                key={"home"}
                                className={s.iconBlock}
                                style={{ paddingLeft: "30px" }}
                            >
                                <Button
                                    type={"blank"}
                                    onClick={openSideBar}
                                >
                                <span className={s.icon}>
                                    {isOpen ? <Close /> : <Bars />}
                                </span>
                                </Button>
                            </div>
                        </div>

                        <div className={s.header_icons_block}>
                            <div className={s.iconBlock}>
                                <Button type={"blank"}>
                                <span className={s.icon}>
                                    <Settings />
                                </span>
                                </Button>
                            </div>
                            <div className={s.iconBlock}>
                                <Button
                                    type={"blank"}
                                    onClick={openAccountMenu}
                                >
                                <span className={s.icon}>
                                    <Account />
                                </span>
                                </Button>
                                <ArrowDown />
                                {
                                    menuOpen &&
                                    <div className={s.account_drop_menu} ref={logoutRef}>
                                        <div>
                                            <Button
                                                type={"blank"}
                                                onClick={() => {
                                                    handlerLogOut();
                                                    navigate("/");
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <Logout />
                                                </span>

                                            </Button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
            <div className={s.content_part}>
                <nav className={s.main} style={isOpen ? { width: "200px" } : { width: "50px" }}>
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map(li => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link
                                                to={li.page}
                                                className={`${s.link} ${activeIcon === li.id ? s.active_icon : s.passive_icon}`}
                                                onClick={() => setActiveIcon(li.id)}
                                            >
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
                     style={!isOpen ? { maxWidth: "calc(100% - 50px)" } : { maxWidth: "calc(100% - 200px)" }}>
                    {children}
                </div>
            </div>
        </>
    );
};


export default Drawer;
