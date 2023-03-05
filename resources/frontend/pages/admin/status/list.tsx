import React, { useEffect, useRef, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useTranslation } from "react-i18next";
import Tabs from "../../../components/tabs/tabs";
import { navigate } from "@reach/router";
import s from "../../layouts/templates/list/list.module.scss";
import NavigationTab from "../../../components/navigation/navigationTab";
import axios from "axios";

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
    const [reasons, setReasons] = useState<number>(0);

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
                setReasons(data.reasons);

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
            count: genderCount,
            selected: false
        },
        // {
        //     id: 2,
        //     name: "escortType",
        //     count: 0
        // },
        {
            id: 4,
            name: "request_type",
            count: requestType,
            selected: false
        }, {
            id: 3,
            name: "los",
            count: los,
            selected: false
        },
        {
            id: 5,
            name: "status",
            count: clientStatus,
            selected: false
        }, {
            id: 6,
            name: "reasons",
            count: reasons,
            selected: false
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
    const handlerEditItem = async (id: number, tabId: number) => await navigate(`/admin/changeStatus/${id}/${tabId}`);
    const handlerAddItem = async (id: number, tabId: number) => await navigate(`/admin/addStatus/${tabId}/create`);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const tableRef = useRef(null);

    const onSearchInput = async (event: { search: string }) => {

    };
    const openSearch = () => {
        if (open) {
            setQuery("");
          ///  setLoading(true);
        }
        setOpen(!open);
    };
    const fileUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const validValues = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if (e.target.files) {
            if (validValues?.includes(e.target.files[0].type)) {
                // setLoadFile(e.target.files[0])
                const data = new FormData();
                data.append("file", e.target.files[0]);
                await axios.post("/api/test", data);
               /// setLoading(true);
            } else {
                ///  setErrorMessage("please upload valid type!");
            }

        }
    };
    return (
        data &&
        <>
            <div className={s.upload_panel}>
                <NavigationTab
                    fileUploader={fileUploader}
                    handlerChangeTabs={handlerChangeTabs}
                    tabs={tabs}
                    typeId={tabId}
                    open={open}
                    onSearchInput={onSearchInput} openSearch={openSearch} tableRef={tableRef} />

            </div>

            <List
                data={data}
                titles={titles}
                isDelete
                isEdit
                tableRef={tableRef}
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
