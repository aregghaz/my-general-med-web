import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";

interface Beneficiary {
    path: string;
    id?: number;
}

const Activity: React.FC<Beneficiary> = ({ id }) => {
    const crudKey = "activity";
    const [tabIdSelected, setTabIdSelected] = useState(3);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await AdminApi.getActivityOperator(id);
            setData(data.actions);
        })();
        // dispatch(actions.clearData())
    }, []);

    const titles: Array<string> = [
        "id",
        "operator",
        "operatorAction",
        "trip_id",
        "vendor",
        ///"clinet_id",
        "created_at"
    ];


    return (
        data && (
            <>
                <List
                    data={data}
                    titles={titles}
                    paginated={false}
                    isDelete={false}
                    isEdit={false}
                    isGetInfo={false}
                    isGetHistory={false}
                    isCreate={false}
                    isGetItems={false}
                />
            </>
        )
    );
};

export default Activity;
