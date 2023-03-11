import React, { useEffect, useRef, useState } from "react";
import List from "../../layouts/templates/list/list";
import { AdminApi } from "../../../api/admin-api/admin-api";

interface INotificationList {
    path: string;
}

const NotificationList: React.FC<INotificationList> = () => {
    const tableRef = useRef(null);
    const [data, setData] = useState([]);

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
        // switch (action) {
        //     case "edit":
        //         await handlerEditItem(id, tabId);
        //         break;
        //     case "add":
        //         await handlerAddItem(id, tabId);
        //         break;
        //
        // }
    };
    return data && (

        <>
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
