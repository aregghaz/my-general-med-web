import React, { useEffect, useState } from "react";
import { checkLoggedIn } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import s from "./site.module.scss";
import { Col, Row } from "react-grid-system";
import { getUserData } from "../../../store/selectors";
import Drawer from "../../../components/drawer/drawer";
import { ToastContainer } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { actionsNotification } from "../../../store/notification";

interface ISite {
    path: string;
}



const Site: React.FC<ISite> = ({ children }) => {

    const dispatch = useDispatch();
    const { user, loggedIn } = useSelector(getUserData);
    const [isLoading, setLoading] = useState(true);
    //
    useEffect(() => {
        (
            async () => {
                await dispatch(checkLoggedIn());
            }
        )();
    }, []);
    useEffect(() => {
        (
            async () => {
                console.log(user, "user");
                if (user.count > 0) {
                    dispatch(actionsNotification.fetching({ count: user.count }));

                }
            }
        )();
    }, [user]);


    console.log("asasdsadsa");
    console.log("asasdsadsa");
    return loggedIn && (
        <Row className={s.mainRow}>
            <div className={s.notificationDiv}>
                <ToastContainer />
            </div>
            <Drawer>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.mainContainer}>
                    {children}
                </Col>
            </Drawer>
        </Row>
    );

};
export default Site;
