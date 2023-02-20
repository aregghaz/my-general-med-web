import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useTranslation } from "react-i18next";

interface Beneficiary {
    path: string;
    clientId?: number;
}

const ActivityClient: React.FC<Beneficiary> = ({ clientId }) => {
    const crudKey = "activity";
    const { t } = useTranslation();
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await AdminApi.getActivityClient(clientId);
            setData(data.actions);
        })();
        // dispatch(actions.clearData())
    }, []);

    const titles: Array<string> = [
        "id",
        "Operator/Vendor",
        "operatorAction",
        ///"trip_id",
        "vendor",
        ///"clinet_id",
        "created_at"
    ];
    // const handlerAction = (action: string, itemId: number) => {
    //     console.log(itemId,itemId,'1111');
    // };

    return (
        data && (
            <>
                <List
                    data={data}
                    titles={titles}
                    paginated={false}
                    isDelete={false}
                    isEdit={false}
                    isGetHistory={false}
                    isCreate={false}
                    isGetItems={false}
                 ///   handlerAction={handlerAction}
                />
            </>
        )
    );
};

export default ActivityClient;
