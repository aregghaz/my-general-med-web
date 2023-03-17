import React, { useEffect, useRef, useState } from "react";
import List from "../../layouts/templates/list/list";
import { AdminApi } from "../../../api/admin-api/admin-api";
import InfoBlockDriver from "../../../components/info-block-driver/info-block";
import { useInView } from "react-intersection-observer";
import s from "./not.module.scss";
import { actionsNotification } from "../../../store/notification";
import { useDispatch } from "react-redux";
import InfoBlockCar from "../../../components/info-block-car/info-block";
import CloseSvg from "-!svg-react-loader!../../../images/Close.svg";

interface INotificationList {
    path: string;
}


const NotificationList: React.FC<INotificationList> = () => {
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [info, setInfoData] = useState(null);
    const [model, setModel] = useState(null);
    const [companyName, setVendor] = useState(null);
    const [updatedField, setField] = useState(null);

    const [loading, setLoading] = useState(false);
    const countRef = useRef(1);
    const dispatch = useDispatch();
    const [ref, inView] = useInView({
        threshold: 1
    });
    const titles: Array<string> = [
        "id",
        "new",
        "value_id",
        "field",
        "type_id",
        "model",
        "created_at"
    ];

    useEffect(() => {
        (
            async () => {
                if (inView || loading) {
                    const notifData = await AdminApi.getNotification(countRef.current);
                    setData(notifData.data);
                    dispatch(actionsNotification.fetching({ count: notifData.count }));
                    countRef.current++;
                    setLoading(false);
                }
            }
        )();
    }, [inView, loading]);

    const handlerAction = async (action: string, id: number) => {
        const notifData = await AdminApi.getInfoData(id, "admin");
        switch (notifData.model) {
            case "driver":
                setInfoData(notifData.data);
                break;
            case "car":
                setInfoData(notifData.data);
                break;
        }
        setField(notifData.field);
        setVendor(notifData.companyName);

        setModel(notifData.model);
        setLoading(true);
    };

    const handlerClose = () =>setModel(null);
    console.log(data, "carcar");
    return data && (

        <>
            {model && <div className={s.infoSection}>
               <div style={{display:"flex", flexDirection:"row", alignContent:"end", justifyContent:'end', padding: "10px 10px 0 0 "}}> <CloseSvg onClick={handlerClose}/></div>
                {model === "driver" && <InfoBlockDriver data={info} is_admin={true} updatedField={updatedField} companyName={companyName} />}
                {model === "car" && <InfoBlockCar data={info} is_admin={true} />}
            </div>}
            <div className={!model ? s.fullWidth :s.infoTable}>
                <List
                    data={data}
                    titles={titles}
                    tableRef={tableRef}
                    isGetInfo={true}
                    isGetHistory={false}
                    handlerAction={handlerAction}
                    className={"pagination"}
                    paginated={false}
                    isCreate={false}
                    isDelete={false}
                    isEdit={false}
                    isGetItems={false}
                />
                <div className={s.detector} ref={ref} />
            </div>
        </>
    );
};


export default NotificationList;
