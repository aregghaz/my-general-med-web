import React, { useEffect, useRef, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import s from "../../layouts/templates/list/list.module.scss";
import NavigationTab from "../../../components/navigation/navigationTab";
import axios from "axios";
import Modal from "react-modal";
import Button from "../../../components/button/button";
import customStyles from "../../../utils/style";
import Close from "-!svg-react-loader!../../../images/Close.svg"

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
    const [ids, setIds] = useState<number>(0);
    const [waitDuration, setWaitDuration] = useState<number>(0);
    const [artificial, setArtificial] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicesCount, setServices] = useState(0);
    const [stairchairCount, setStairchairCount] = useState(0);

    const { t } = useTranslation();
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getAllStatusData(crudKey, tabId);
                setData(data.table);
                setGenderCount(data.counts.gender);
                setLos(data.counts.los);
                setClientStatus(data.counts.clientStatus);
                setRequestType(data.counts.requestType);
                setReasons(data.counts.reasons);
                setWaitDuration(data.counts.waitDuration);
                setArtificial(data.counts.artificial);
                setServices(data.counts.services);
                setStairchairCount(data.counts.stairchair);

            }
        )();
    }, [tabId, loading]);

    const titles: Array<string> = [
        "id",
        "nameStatus",
      ///  "slug",
        "action"
    ];

    const tabs = [
        {
            id: 1,
            name: "gender",
            count: genderCount,
            selected: false
        },
        {
            id: 2,
            name: "request_type",
            count: requestType,
            selected: false
        },
        {
            id: 4,
            name: "status",
            count: clientStatus,
            selected: false
        }, {
            id: 5,
            name: "reasons",
            count: reasons,
            selected: false
        }, {
            id: 6,
            name: "artificial",
            count: artificial,
            selected: false
        }, {
            id: 7,
            name: "waitDuration",
            count: waitDuration,
            selected: false
        }, {
            id: 9,
            name: "stairchair",
            count: stairchairCount,
            selected: false
        },{
            id: 3,
            name: "los",
            count: los,
            selected: false
        }, {
            id: 8,
            name: "Services",
            count: servicesCount,
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
            case "delete":
                setIds(id);
                await handlerDelete(id);
                break;

        }
    };

    const handlerDelete = async (id: number) => {
        setIsModalOpen(true);

    };
    const handlerEditItem = async (id: number, tabId: number) => await navigate(`/admin/changeStatus/${id}/${tabId}`);
    const handlerAddItem = async (id: number, tabId: number) => await navigate(`/admin/addStatus/${tabId}/create`);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const tableRef = useRef(null);

    const onSearchInput = async (event: { search: string }) => {

    };
    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlerDeleteItem = async () => {
        await AdminApi.deleteStatus(ids, tabId);
        handlerCloseModal();
        setLoading(!loading);
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

            <div style={{ width: "50%" }}>
                <List
                    data={data}
                    titles={titles}
                    isDelete={true}
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
                <Modal
                    isOpen={isModalOpen !== false}
                    style={customStyles}
                    onRequestClose={handlerCloseModal}
                >
                    <div className={s.modalBody}>
                        <div className={s.iconWrapper}>
                            <div className={s.iconCircle} onClick={handlerCloseModal}>

                                <Close  className={s.modalClose}/>
                            </div>
                        </div>
                        <div className={s.contentWrapper}>
                            <p className={s.text}>
                                {t("Do you want to delete")}
                            </p>
                            <div className={s.buttons}>
                                <Button
                                    type={"transparent"}
                                    onClick={handlerDeleteItem}
                                    className={`${s.button} ${s.yesButton}`}
                                >
                                    {t("yes")}
                                </Button>
                                <Button
                                    type={"transparent"}
                                    onClick={handlerCloseModal}
                                    className={s.button}
                                >
                                    {t("no")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    );
};


export default Status;
