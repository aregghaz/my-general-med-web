import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Tabs from "../../../components/tabs/tabs";
import { navigate } from "@reach/router";

interface Beneficiary {
    path: string;
}

const Status: React.FC<Beneficiary> = () => {
    const crudKey = "changeStatus";
    const [data, setData] = useState([]);
    const [genderCount, setGenderCount] = useState<number>(0);
    const [tabId, setTabId] = useState<number>(1);
    const [los, setLos] = useState<number>(0);
    const [clientStatus, setClientStatus] = useState<number>(0);
    const [requestType, setRequestType] = useState<number>(0);

    const { t } = useTranslation();
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getAllStatusData(crudKey, tabId);
                setData(data.table);
                setGenderCount(data.gender);
                setLos(data.los);
                setClientStatus(data.clientStatus);
                setRequestType(data.requestType);

            }
        )();
    }, [tabId]);

    const titles: Array<string> = [
        "id",
        "nameStatus",
        "slug",
        "action"
    ];

    const tabs = [
        {
            id: 1,
            name: "gender",
            count: genderCount
        },
        // {
        //     id: 2,
        //     name: "escortType",
        //     count: 0
        // },
        {
            id: 4,
            name: "request_type",
            count: requestType
        }, {
            id: 3,
            name: "los",
            count: los
        },
        {
            id: 5,
            name: "status",
            count: clientStatus
        }
    ];

    const handlerChangeTabs = (statusId: number) => {
        setTabId(statusId);
    };
    const handlerAction = async (action: string, id: number) => {
        switch (action) {
            case "edit":
                await handlerEditItem(id, tabId);
                break;
            case "add":
                await handlerAddItem(id, tabId);
                break;

        }
    };
    const handlerEditItem = async (id: number, tabId: number) => await navigate(`/admin/changeStatus/${id}/${tabId}`)
    const handlerAddItem = async (id: number, tabId: number) => await navigate(`/admin/addStatus/${tabId}/create`)
    return (
        data &&
        <>
            {/* <InfoBlock  items={data}/> */}
            <div style={{
                padding: 10
                /// border: 1px solid #ddd;
                ///  background-color: $whiteColor;

            }}>
                <Tabs tabs={tabs} handlerChangeTabs={handlerChangeTabs} />

            </div>

            <List
                data={data}
                titles={titles}
                isDelete
                isEdit
                isGetInfo={false}
                isGetHistory={false}
                isCreate
                isGetItems={false}
                handlerAction={handlerAction}
                className={"pagination"}
                paginated={false}
            />


        </>
    );
};


export default Status;
