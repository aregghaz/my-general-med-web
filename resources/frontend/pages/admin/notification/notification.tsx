import React, { useEffect, useRef, useState } from "react";
import List from "../../layouts/templates/list/list";
import { AdminApi } from "../../../api/admin-api/admin-api";
import InfoBlockDriver from "../../../components/info-block-driver/info-block";
import { useInView } from "react-intersection-observer";
import s from "./not.module.scss";
import { actionsNotification } from "../../../store/notification";
import { useDispatch, useSelector } from "react-redux";
import InfoBlockCar from "../../../components/info-block-car/info-block";
import CloseSvg from "-!svg-react-loader!../../../images/Close.svg";
import NavigationTab from "../../../components/navigation/navigationTab";
import { actionsNotify } from "../../../store/not";
import { getNotify } from "../../../store/selectors";
import InfoBlockTrips from "../../../components/info-block-trips/info-block";
import InfoBlockPatient from "../../../components/info-block-patient/info-block";
import {useNavigate} from "@reach/router";


interface INotificationList {
    path: string;
}


const NotificationList: React.FC<INotificationList> = () => {

    const navigate = useNavigate()

    const tableRef = useRef(null);

    const [info, setInfoData] = useState(null);
    const [model, setModel] = useState(null);
    const [companyName, setVendor] = useState(null);
    const [updatedField, setField] = useState(null);
    const [typeId, setTypeId] = useState<number>(1);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const notifyData = useSelector(getNotify);
    const [loading, setLoading] = useState(true);
    const countRef = useRef(1);
    const dispatch = useDispatch();
    const [ref, inView] = useInView({
        threshold: 1
    });
    const { data, driverCount, carCount, patientCount, tripsCount } = notifyData;
    const titles: Array<string> = [
        "id",
        "new",
        typeId === 1 ? "drivers" : (typeId === 2 ? "Car" : (typeId === 3 ? "field" : "tripNot")),
        typeId === 3 ?  "member_uniqie_identifer": "field",
        "type_id",
        "model",
        "created_at"
    ];


    useEffect(() => {
        (
            async () => {
                if (inView || loading) {
                    const notifData = await AdminApi.getNotification(countRef.current, typeId);
                    dispatch(actionsNotify.fetching({
                        data: notifData.data,
                        driverCount: notifData.driverCount,
                        carCount: notifData.carCount,
                        patientCount: notifData.patientCount,
                        tripsCount: notifData.tripsCount
                    }));
                    dispatch(actionsNotification.fetching({ count: notifData.count }));
                    countRef.current++;
                    setLoading(false);
                }
            }
        )();
    }, [inView, loading, typeId]);

    const handlerAction = async (action: string, id: number) => {
        const notifData = await AdminApi.getInfoData(id, "admin");
        setInfoData(notifData.data)
        setField(notifData.field);
        setVendor(notifData.companyName);
        setModel(notifData.model);
        setLoading(true);
    };

    useEffect(() => {
        if (info) {
            // navigate(info.id ? `client/${info.id}` : "")
            if (info.id && model === "trip") {
                window.open(`client/${info.id}`, "_blank")
            }
        }
    }, [model, info])

    const tabs = [
        {
            id: 1,
            name: "Driver",
            count: driverCount,
            selected: false
        },
        {
            id: 2,
            name: "Car",
            count: carCount,
            selected: false
        },
        {
            id: 3,
            name: "patient",
            count: patientCount,
            selected: false
        }, {
            id: 5,
            name: "Trips",
            count: tripsCount,
            selected: false
        }
    ];
    const handlerChangeTabs = async (tabId: number) => {
        setTypeId(tabId);
        setLoading(true);
    };
    const onSearchInput = async (event: { search: string }) => {
        setQuery(event.search);
        setLoading(true);
    };


    const openSearch = () => {
        if (open) {
            setQuery("");
            setLoading(true);
        }
        setOpen(!open);
    };
    const handlerClose = () => setModel(null);
    console.log(data, "carcar");
    return data && (

        <>
            <div className={s.upload_panel}>
                <NavigationTab
                    // fileUploader={fileUploader}
                    handlerChangeTabs={handlerChangeTabs}
                    tabs={tabs}
                    typeId={typeId}
                    open={open}
                    onSearchInput={onSearchInput} openSearch={openSearch} tableRef={tableRef} />

            </div>
            {/*{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}*/}
            {model && model !== "trip" && <div className={s.infoSection}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "end",
                    justifyContent: "end",
                    padding: "10px 10px 0 0 "
                }}><CloseSvg style={{ cursor: "pointer" }} onClick={handlerClose} /></div>
                {model === "driver" && <InfoBlockDriver data={info} is_admin={true} updatedField={updatedField}
                                                        companyName={companyName} />}
                {model === "car" &&
                    <InfoBlockCar data={info} companyName={companyName} updatedField={updatedField} is_admin={true} />}

                {model === "client" && <InfoBlockPatient data={info} is_admin={true} />}


                {/*{model === "trip" && <div>Hello {JSON.stringify(data)}</div>}*/}
            </div>}
            <div className={model === "trip" ? s.fullWidth : !model ? s.fullWidth : s.infoTable}>
                {data && <List
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
                />}
                <div className={s.detector} ref={ref} />
            </div>
        </>
    );
};


export default NotificationList;
