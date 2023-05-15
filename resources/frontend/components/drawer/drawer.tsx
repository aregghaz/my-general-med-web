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
import Drivers from "-!svg-react-loader!../../images/driver.svg";
import Logout from "-!svg-react-loader!../../images/SignOut.svg";
import ProfileSvg from "-!svg-react-loader!../../images/profile1.svg";
import Notification from "-!svg-react-loader!../../images/notifications.svg";
import NotificationActive from "-!svg-react-loader!../../images/notifications-active.svg";
import Clients from "-!svg-react-loader!../../images/Clients.svg";
import Cars from "-!svg-react-loader!../../images/Car.svg";
import HomeIcon from "-!svg-react-loader!../../images/my-services.svg";
import Status from "-!svg-react-loader!../../images/Settings.svg";
import { getNotificationCount, getUserData } from "../../store/selectors";
import AssignVendorIcon from "-!svg-react-loader!../../images/add-company-icon.svg";

const Drawer: React.FC = ({ children }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutRef = useRef(null);
    const accountRef = useRef(null);
    const userData = useSelector(getUserData);
    //  const { user, loggedIn } = useSelector(getUserData);
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
        if (userData.user) {
            ///  dispatch(actionsNotification.fetching({ count: userData.user.count }));
        }
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [logoutRef]);
    console.log(notificationCount, "notificationCount");

    var menuItemsFirst: Array<{
        id: number,
        Icon: any,
        item: string,
        page: string,
        count: number,
    }> = [];


    if (userData.user) {

        const IconArray = [
            {
                id: 1,
                icon: <HomeIcon />
            }, {
                id: 2,
                icon: <AssignVendorIcon />
            }, {
                id: 3,
                icon: <Clients />
            }, {
                id: 4,
                icon: <Drivers />
            },
            {
                id: 5,
                icon: <Cars />
            },
            {
                id: 7,
                icon: <Notification />,
                count: userData.user.count
            }, {
                id: 8,
                icon: <Status />
            }
        ];



        userData.user.pages.map((item, index) => {
            console.log(IconArray.find(x => x.id == item.id), "menuItemsFirst");
            const pathUrl = userData.user.role == "admin" ? `/${userData.user.role}` : "";
            menuItemsFirst.push({
                id: item.id,
                Icon: IconArray.find(x => x.id == item.id).icon,
                item: item.name,
                page: `${pathUrl}${item.slug}`,
                count: item.count
            });
        });
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
                                    onClick={() => {
                                        console.log(menuOpen);
                                        openAccountMenu();
                                    }}
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
                                                    navigate("/profile");
                                                    openAccountMenu();
                                                    // if (userData.user.role === "admin") {
                                                    //     navigate("/admin/profile");
                                                    //     openAccountMenu();
                                                    // } else {
                                                    //     navigate("/profile");
                                                    //     openAccountMenu();
                                                    // }
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
                                .map((li) => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link
                                                to={li.page}
                                                className={`${s.link} ${selectedPage === li.id ? s.active_icon : s.passive_icon}`}
                                                onClick={() => setActiveIcon(li.id)}
                                            >
                                                <span className={s.link_block}>
                                                <span className={s.side_icon}>
                                                    {li.id === 2 ? (li.count > 0 ? <> <NotificationActive /> <span
                                                            className={s.bage}>{li.count}</span></> :
                                                        li.Icon) : li.Icon}

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
