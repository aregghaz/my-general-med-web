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
import Users from "-!svg-react-loader!../../images/User.svg";
import Logout from "-!svg-react-loader!../../images/SignOut.svg";
import ProfileSvg from "-!svg-react-loader!../../images/profile1.svg";
import Settings from "-!svg-react-loader!../../images/Settings.svg";
import Notification from "-!svg-react-loader!../../images/notifications.svg";
import NotificationActive from "-!svg-react-loader!../../images/notifications-active.svg";
import Clients from "-!svg-react-loader!../../images/Clients.svg";
import Cars from "-!svg-react-loader!../../images/Car.svg";
import ArrowDown from "-!svg-react-loader!../../svgs/arrow-down.svg";
import HomeIcon from "-!svg-react-loader!../../images/my-services.svg";
import Status from "-!svg-react-loader!../../images/Status.svg";
import { getNotificationCount, getUserData } from "../../store/selectors";
import Profile from "../../pages/admin/profile/profile";

const Drawer: React.FC = ({ children }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutRef = useRef(null);
    const accountRef = useRef(null)
    const userData = useSelector(getUserData);
    /// const selectedPage = useSelector(getSelectedMenu);
    const notificationCount = useSelector(getNotificationCount);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handlerLogOut = () => dispatch(setLogOut());
    const openAccountMenu = () => setMenuOpen(!menuOpen);
    const openSideBar = () => setIsOpen(!isOpen);
    const outsideClickHandler = (e: MouseEvent) => {
        if (logoutRef.current && !logoutRef.current.contains(e.target) && !accountRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    var selectedPage2: string = localStorage.getItem("page");
    var selectedPage = parseFloat(selectedPage2);
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
        page: string,
    }> = [];
    if (userData.user && (userData.user.role == "vendor")) {
        menuItemsFirst = [
            {
                id: 4,
                Icon: <HomeIcon />,
                item: "Dashboard",
                page: "/dashboard"
            }, {
                id: 1,
                Icon: <Clients />,
                item: "clients",
                page: "/"
            },
            {
                id: 2,
                Icon: <Account />,
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
                Icon: <Account />,
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
            }
            // {
            //     id: 6,
            //     Icon: <UserRole />,
            //     item: "role",
            //     page: "/admin"
            // }

        ];

    } else if (userData.user && userData.user.role == "operator") {
        menuItemsFirst = [
            {
                id: 1,
                Icon: <HomeIcon />,
                item: "Home",
                page: "/operators"
            },
            {
                id: 2,
                Icon: <Account />,
                item: "vendors",
                page: "/operators/vendors"
            },
            {
                id: 4,
                Icon: <Clients />,
                item: "clients",
                page: "/operators/clients"
            }


        ];
    }

    ///  const [activeIcon, setActiveIcon] = useState<number>(1);

    const setActiveIcon = (pageId: number) => {
        localStorage.setItem("page", `${pageId}`);
        /// dispatch(navigationActions.fetching({page:pageId}));
    };
    return (
        <>
            <nav className={s.header_nav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div className={s.logoSection}>
                            <div className={s.logoDiv}>
                                <img src={`../../images/logo.png`} alt="logo" />
                            </div>


                        </div>

                        <div className={s.header_icons_block}>

                            {/*<div className={s.iconBlock}>*/}
                            {/*    <Button type={"blank"}>*/}
                            {/*    <span className={s.icon}>*/}
                            {/*        <Notification />*/}
                            {/*    </span>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            <div className={s.iconBlock} ref={accountRef}>
                                <Button
                                    type={"blank"}
                                    onClick={() => {console.log(menuOpen); openAccountMenu()}}
                                >
                                <span className={s.icon}>
                                    <Account />
                                </span>
                                </Button>
                                {
                                    menuOpen &&
                                    <div className={s.account_drop_menu} ref={logoutRef}>
                                        <div>
                                            <Button
                                                className={s.logOutButton}
                                                type={"blank"}
                                                onClick={() => {
                                                    if (userData.user.role === "admin") {
                                                        navigate("/admin/profile");
                                                    } else {
                                                        navigate("/profile");
                                                    }
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <ProfileSvg />
                                                </span>
                                                <span className={s.iconLabel}>
                                                    Profile
                                                </span>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                className={s.logOutButton}
                                                type={"blank"}
                                                onClick={() => {
                                                    handlerLogOut();
                                                    navigate("/login");
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <Logout />
                                                </span>
                                                <span className={s.iconLabel}>
                                                    Log out
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
                    <div
                        key={"home"}
                        className={s.iconBlock}
                        style={{ padding: "10px 12px" }}
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
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map(li => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link
                                                to={li.page}
                                                className={`${s.link} ${selectedPage === li.id ? s.active_icon : s.passive_icon}`}
                                                onClick={() => setActiveIcon(li.id)}
                                            >
                                                <span className={s.link_block}>
                                                <span className={s.side_icon}>
                                                    {li.Icon}
                                                </span>
                                                <span className={s.side_text}>
                                                    {t(li.item)}
                                                </span>
                                                </span>

                                            </Link>
                                        </li>
                                    )
                                )
                        }
                        {
                            userData.user && <li className={s.item} key={`first-notification`}>
                                <Link

                                    to={userData.user && userData.user.role === "admin" ? "/admin/notification" : "/notification"}
                                    className={`${s.link} ${selectedPage === 6 ? s.active_icon : s.passive_icon}`}
                                    onClick={() => setActiveIcon(6)}
                                >
                                                <span className={s.link_block}>
                                                <span className={s.side_icon}>
                                                    {/*{li.Icon}*/}
                                                    {userData.user.count > 1 ? <> <NotificationActive /> <span
                                                            className={s.bage}>{notificationCount.count}</span></> :
                                                        <Notification />}
                                                </span>
                                                <span className={s.side_text}>
                                                    {t("Notification")}
                                                </span>
                                                </span>
                                </Link>
                            </li>
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
