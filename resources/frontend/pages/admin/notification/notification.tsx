import React, { useEffect, useRef, useState } from "react";
import List from "../../layouts/templates/list/list";
import { AdminApi } from "../../../api/admin-api/admin-api";
import InfoBlockDriver from "../../../components/info-block-driver/info-block";

interface INotificationList {
    path: string;
}

const NotificationList: React.FC<INotificationList> = () => {
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [driver, setDriver] = useState(null);

    const titles: Array<string> = [
        "id",
        "new",
        "value_id",
        "field",
        "type_id",
        "model"
    ];

    useEffect(() => {
        (
            async () => {
                const notifData = await AdminApi.getNotification();
                setData(notifData.data);
            }
        )();
    }, []);

    const handlerAction = async (action: string, id: number) => {
        console.log(id,action,'id');
        const notifData = await AdminApi.getInfoData(id);
        setDriver(notifData.data)
    };
    return data && (

        <>
            {driver && <InfoBlockDriver data={driver} />}
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
        </>
    );
};


export default NotificationList;
