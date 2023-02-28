import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/home";
import { getHomePageData, getTabId } from "../../../store/selectors";
import s from "../../../styles/home.module.scss";
import CrudTable from "../../../components/crud-table-user/crud-table";
import Select, { IOption } from "../../../components/select/select";
import { useInView } from "react-intersection-observer";
import Upload from "-!svg-react-loader!../../../images/Upload.svg";
import Import from "-!svg-react-loader!../../../images/Import.svg";
import Filters from "-!svg-react-loader!../../../images/filters.svg";
import Search from "-!svg-react-loader!../../../images/Search.svg";
import Close from "-!svg-react-loader!../../../images/Close.svg";
import axios from "axios";
import BackDropSearch from "../../../components/backdrop-search/backdrop-search";
import Modal from "react-modal";
import PopupModal from "../../../components/popup-modal/popup-modal";
import MultiSelectSort from "../../../components/select/sort-select";
import { vendorAPI } from "../../../api/site-api/vendor-api";
import Tabs from "../../../components/tabs/tabs";
import Button from "../../../components/button/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { navigate } from "@reach/router";
import AssignVendorIcon from "-!svg-react-loader!../../../images/add-company-icon.svg";
import { actionsTabs } from "../../../store/tab";


interface IHome {
    path: string;
}

const customStyles: ReactModal.Styles = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        overflow: "hidden",
        transform: "translate(-50% , -50%)",
        /// display: 'flex',
        justifyContent: "center"
        ///  alignItems: "center",
    },
    overlay: {
        zIndex: 400,
        overflow: "hidden",
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)"
    }
};

const Home: React.FC<IHome> = () => {
    const { t } = useTranslation();
    const contentRef = useRef();
    const countRef = useRef(2);
    const homeData = useSelector(getHomePageData);
    const tabId = useSelector(getTabId);
    const dispatch = useDispatch();
    const {
        selectedTitle,
        titles: allTiles,
        clients,
        cancelCount,
        tripCount,
        availableCount,
        progressCount,
        doneCount
    } = homeData;
    const { typeId } = tabId;
    const [defaultData, setDefaultData] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ids, setIds] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    ///  const [typeId, setTypeId] = useState<number>(1);
    const [filtre, setfiltre] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [agreement, setAgreement] = useState<boolean>(false);
    const [vendorData, setVendorData] = useState<Array<any>>(null);
    const [selectedVendor, setSelectedVendor] = useState<IOption>(null);
    const tableRef = useRef(null);

    const [query, setQuery] = useState("");
    const [ref, inView] = useInView({
        threshold: 1
    });

    const tabs = [
        {
            id: 1,
            name: "Trips",
            count: tripCount,
            selected: (typeId == 1)
        },
        {
            id: 4,
            name: "Rerouted trips",
            count: cancelCount,
            selected: (typeId == 4)
        },
        {
            id: 5,
            name: "Trips in Progress",
            count: progressCount,
            selected: (typeId == 5)
        },
        {
            id: 6,
            name: "Completed Trips",
            count: doneCount,
            selected: (typeId == 6)
        },
        {
            id: 2,
            name: "Available Trips",
            count: availableCount,
            selected: (typeId == 2)
        }
    ];


    const [titles, setTitles] = useState<string[]>([]);

    const openSearch = () => {
        if (open) {
            setQuery("");
            setLoading(true);
        }
        setOpen(!open);
    };

    const handlerSelectClient = async (id: number) => {
        ///  if (event.ctrlKey || event.shiftKey) {
        const objWithIdIndex = ids.findIndex((value) => value === id);
        if (objWithIdIndex > -1) {
            setIds((state) => {
                return state.filter((value) => value !== id);
            });
        } else {
            setIds((state) => {
                return [
                    ...state,
                    id
                ];
            });
        }
    };
    const handlerInfo = (id: number) => {
        window.open(`/admin/client/${id}`, "_blank", "noreferrer");
    };
    const handlerAction = async (id: number, action: string) => {
        switch (action) {
            case "get":
                await handlerSelectClient(id);
                break;
            case "info":
                await handlerInfo(id);
                break;
            case "edit":
                await handlerEditItem(id);
                break;
            case "assignVendor":
                await handleActionMiddleware(id);
                break;
            case "history":
                await handleGetHistory(id);
                break;
        }
    };


    useEffect(() => {
        (async () => {
            if ((inView || loading)) {
                const titlesData = localStorage.getItem("titles");
                const homeData = await AdminApi.getAllData({
                    titles: titles.length ? titles : JSON.parse(titlesData),
                    showMore: countRef.current,
                    typeId: typeId,
                    queryData:query
                });
                setDefaultData(homeData.titles);
                dispatch(actions.setTitles({
                    titles: homeData.titles,
                    selectedTitle: homeData.selectedFields,
                    clients: homeData.clients,
                    tripCount: homeData.tripCount,
                    availableCount: homeData.availableCount,
                    cancelCount: homeData.cancelCount,
                    doneCount: homeData.doneCount,
                    progressCount: homeData.progressCount
                }));
                countRef.current++;
                setLoading(false);
            }
        })();
        return () => {
            ///   homeAPI.cancelRequest();
        };

    }, [inView, loading, typeId]);

    const onSearchInput = async (event: { search: string }) => {
        const titlesData = localStorage.getItem("titles");
        setQuery(event.search)
        const homeData = await AdminApi.getAllData({
            titles: titles.length ? titles : JSON.parse(titlesData),
            showMore: countRef.current,
            typeId: typeId,
            queryData: event.search
        });
        setDefaultData(homeData.titles);
        dispatch(actions.setTitles({
            titles: homeData.titles,
            selectedTitle: homeData.selectedFields,
            clients: homeData.clients,
            tripCount: homeData.tripCount,
            availableCount: homeData.availableCount,
            cancelCount: homeData.cancelCount,
            doneCount: homeData.doneCount,
            progressCount: homeData.progressCount
        }));
        // }
    };

    const changeFields = (options: Array<IOption>) => {
        console.log(options, "options");
        let result = options.map(a => a.slug);
        localStorage.setItem("titles", JSON.stringify(result));
        if (result.length > 0) {
            setTitles(result);
            setLoading(true);
        }
    };

    const fileUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const validValues = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if (e.target.files) {
            if (validValues?.includes(e.target.files[0].type)) {
                // setLoadFile(e.target.files[0])
                const data = new FormData();
                data.append("file", e.target.files[0]);
                await axios.post("/api/test", data);
                setLoading(true);
            } else {
                setErrorMessage("please upload valid type!");
            }

        }
    };

    const handlerChangeTabs = async (tabId: number) => {
        setIds([]);
        dispatch(actionsTabs.fetching({ tabId: tabId }));
        setLoading(true);
    };


    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (agreement) {
        // delay(200).then(async () => {
        //     await homeAPI.changeClientsTypes({ status, ids });
        //     setIds([]);
        //     setLoading(true);
        //     setAgreement(false);
        // });
    }

    const handleActionMiddleware = async (id?: number) => {
        if (typeof id === "number") {
            setIds([id]);
        }
        const getData = await vendorAPI.getVendorsDataForSelect();
        setVendorData(getData.data);
        setIsModalOpen(true);
    };
    const agreeWith = (callOrNot: boolean) => {
        setAgreement(callOrNot);
        setIsOpen(false);
    };
    const notAgreeWith = () => setIsOpen(false);


    const handlerCloseModal = () => {
        setSelectedVendor(null);
        setVendorData(null);
        setIsModalOpen(false);
    };

    const handleGetHistory = (id: number) => {
        navigate(`/admin/activity-client/${id}`);
    };


    const changeSortPosition = (arr: Array<IOption>) => {
        let result = arr.map(a => a.slug);
        localStorage.setItem("titles", JSON.stringify(result));
        setTitles(result);
        setLoading(true);
    };


    const handlerSetVendor = async () => {
        const getCarData = await vendorAPI.assignVendorToClient({
            ids: ids,
            vendorId: selectedVendor.id
        });

        if (getCarData.success) {
            setIds([]);
            handlerCloseModal();
            setLoading(true);
        } else {
            setIsModalOpen(false);
            setErrorMessage(getCarData.error);
            delay(2000).then(async () => {
                setErrorMessage("");
            });
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

    }, [isModalOpen]);

    const showFilter = () => {
        setfiltre(!filtre);
    };
    const handlerEditItem = (id: number) => navigate(`/admin/clients/${id}`);
    const handlerAddItem = () => navigate("/admin/clients/create");
    return (
        clients && <>

            <div className={s.panel}>
                <div className={s.upload_panel}>
                    <Tabs tabs={tabs}
                          handlerChangeTabs={handlerChangeTabs} />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className={s.import_block}>
                            <AssignVendorIcon
                                className={`${s.icon} ${ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                                onClick={() => handleActionMiddleware()}
                            />

                        </div>
                        <div className={s.import_block}>
                            <Filters height="24px" onClick={showFilter} />
                        </div>
                        <div className={s.upload_block}>
                            <label htmlFor="uploadFile">
                                <DownloadTableExcel
                                    filename="users table"
                                    sheet="users"
                                    currentTableRef={tableRef.current}
                                >
                                    <Upload />
                                </DownloadTableExcel>

                            </label>
                            <input
                                id="uploadFile"
                                type="file"
                                onChange={fileUploader}
                                style={{ display: "none" }}
                                accept=".xls, .xlsx, .csv"
                            />
                        </div>
                        <div className={s.import_block}>
                            <label>
                                <Import />
                            </label>
                        </div>
                        <div className={s.import_block} onClick={() => {
                            openSearch();
                        }}>
                            {open ? <Close /> : <Search />}
                        </div>
                    </div>
                    <div
                        className={`${s.header_input_block} ${open ? s.active : s.passive}`}
                    >
                        <BackDropSearch handlerSubmit={onSearchInput} />
                    </div>

                </div>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

                <Modal
                    isOpen={isModalOpen !== false}
                    style={customStyles}
                    ariaHideApp={false}
                    onRequestClose={handlerCloseModal}
                >
                    <div className={s.modalBody}>
                        <div className={s.iconWrapper}>
                            <i className="cancelicon-"
                               onClick={handlerCloseModal}
                            />
                        </div>

                        {
                            vendorData && <div className={s.modalDiv}>
                                <div className={s.selectDiv}>
                                    <Select
                                        getOptionValue={(option: IOption) => option.value}
                                        getOptionLabel={(option: IOption) => option.label}
                                        onChange={(options: IOption) => setSelectedVendor(options)}
                                        options={vendorData}
                                        // value={selectedTitle}
                                        name={"Cars"}
                                        isMulti={false}
                                    />
                                    <div className={s.assign}>
                                        <Button isSubmit={true} type={"adminUpdate"}
                                                onClick={handlerSetVendor}> {t("assign")}</Button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </Modal>
                <div className={s.iconBlock}>
                    {filtre && Object.values(selectedTitle).length > 0 && <MultiSelectSort
                        isSearchable={true}
                        placeholder={"title"}
                        options={defaultData}
                        onChange={(options: Array<IOption>) => changeFields(options)}
                        getOptionValue={(option: IOption) => option.slug}
                        getOptionLabel={(option: IOption) => t(option.label)}
                        value={selectedTitle}
                        name={"filter"}
                        isMulti={true}
                        onChangePosition={changeSortPosition}
                    />}
                </div>
            </div>
            <PopupModal isOpen={isOpen} agreeWith={agreeWith} notAgreeWith={notAgreeWith} />
            <div className={s.addBtnWrapper}>
                {
                    <Button type="green" className={s.add} onClick={handlerAddItem}>
                        <span>+</span>
                    </Button>
                }
            </div>
            <div ref={contentRef} className={s.table_wrapper}>
                <CrudTable
                    titles={selectedTitle}
                    data={clients}
                    isEdit
                    action
                    isInfo
                    isGetHistory
                    isAssignVendor
                    handlerAction={handlerAction}
                    tableRef={tableRef}
                    className={"pagination"}
                    selectedIds={ids}
                    typeId={typeId}
                    isAssign={false}
                    isClaim={false}
                    isRemove={false}
                    isDelete
                />
                <div className={s.detector} ref={ref} />
            </div>

        </>
    );
};
export default Home;
