import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/home";
import { clientAction } from "../../../store/client";
import { getHomePageData } from "../../../store/selectors";
import { homeAPI } from "../../../api/site-api/home-api";
import s from "../../../styles/home.module.scss";
import CrudTable from "../../../components/crud-table-user/crud-table";
import Select, { IOption } from "../../../components/select/select";
import { useInView } from "react-intersection-observer";
import Upload from "-!svg-react-loader!../../../images/Upload.svg";
import Import from "-!svg-react-loader!../../../images/Import.svg";
import Filters from "-!svg-react-loader!../../../images/database-svgrepo-com.svg";
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
import AssignIcon from "-!svg-react-loader!../../../images/car-travel-plus-add-svgrepo-com.svg";
import ClaimTrip from "-!svg-react-loader!../../../images/briefcase-work-business-add-svgrepo-com.svg";
import RemoveIcon from "-!svg-react-loader!../../../images/briefcase-work-business-delete-svgrepo-com.svg";

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
        justifyContent: "center",
        ///  alignItems: "center",
        height: "fit-content"
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
    const countRef = useRef(2);
    const homeData = useSelector(getHomePageData);
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
    const [defaultData, setDefaultData] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ids, setIds] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [typeId, setTypeId] = useState<number>(1);
    const [filtre, setfiltre] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [agreement, setAgreement] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);
    const [carData, setCarData] = useState<Array<any>>(null);
    const [car, setCar] = useState<IOption>(null);
    const tableRef = useRef(null);

    const [ref, inView] = useInView({
        threshold: 1
    });


    const tabs = [
        // {
        //     id: 1,
        //     name: "All",
        //     count: tripCount+cancelCount+progressCount+doneCount+availableCount,
        // },
        {
            id: 1,
            name: "Trips",
            count: tripCount
        },
        {
            id: 4,
            name: "Rerouted trips",
            count: cancelCount
        },
        {
            id: 5,
            name: "Trips in Progress",
            count: progressCount
        },
        {
            id: 6,
            name: "Completed Trips",
            count: doneCount
        },
        {
            id: 2,
            name: "Available Trips",
            count: availableCount
        }
    ];

    const [titles, setTitles] = useState<string[]>([]);

    const openSearch = () => {
        setOpen(!open);
    };


    const handlerGetClientData = async (id: number) => {
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
        window.open(`/client/${id}`, "_blank", "noreferrer");
    };
    const handlerAction = async (id: number, action: string) => {
        switch (action) {
            case "get":
                await handlerGetClientData(id);
                break;
            case "info":
                await handlerInfo(id);
                break;
            case "assign":
                await handlerGetClientData(id);
                await handleActionMiddleware(id, 'assign');
                break;
            case "claim":
                setIds([id]);
                setStatus(1);
                setIsOpen(true);
                break;
            case "remove":
                setIds([id]);
                setStatus(4);
                setIsOpen(true);
                break;
        }
    };

    useEffect(() => {
        (async () => {
            if ((inView || loading) && !open) {
                const titlesData = localStorage.getItem("titles");
                const homeData = await homeAPI.getClientData({
                    titles: titles.length ? titles : JSON.parse(titlesData),
                    showMore: countRef.current,
                    typeId: typeId
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
            homeAPI.cancelRequest();
        };

    }, [inView, loading]);

    const onSearchInput = async (event: { search: string }) => {
        const titlesData = localStorage.getItem("titles");
        const homeData = await homeAPI.getClientData({
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
        countRef.current = 1;
        setIds([]);
        setTypeId(tabId);
        setLoading(true);
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (agreement && ids.length >0) {
        delay(200).then(async () => {
            await homeAPI.changeClientsTypes({ status, ids });
            setIds([]);
            setLoading(true);
            setAgreement(false);
        });
    }

    const handleActionMiddleware = async (status: number, action: string) => {
        switch (action) {
            case "assign":
                const getCarData = await vendorAPI.getCarsDataForSelect("cars");
                setCarData(getCarData.cars);
                setIsModalOpen(true);
                break;
            case "default":
                setIsOpen(true);
                setStatus(status);
                break;
        }
        // if (ids.length > 0 && status !== 99) {
        //     setIsOpen(true);
        //     setStatus(status);
        // } else if (status == 99) {
        //     const getCarData = await vendorAPI.getCarsDataForSelect("cars");
        //     setCarData(getCarData.cars);
        //     setIsModalOpen(true);
        // }

    };
    const agreeWith = (callOrNot: boolean) => {
        setAgreement(callOrNot);
        setIsOpen(false);
    };
    const notAgreeWith = () => setIsOpen(false);


    const handlerCloseModal = () => {
        dispatch(clientAction.fetching({ clientById: null }));
        setCar(null);
        setCarData(null);
        setIsModalOpen(false);
    };

    const changeSortPosition = (arr: Array<IOption>) => {
        let result = arr.map(a => a.slug);
        localStorage.setItem("titles", JSON.stringify(result));
        setTitles(result);
        setLoading(true);
    };


    const handlerSetCar = async () => {
        const getCarData = await vendorAPI.assignCarToClient({
            ids: ids,
            carId: parseFloat(car.value)
        });
        if (getCarData.success) {
            handlerCloseModal();
            setLoading(true);
            setIds([]);
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
    return (
        clients && <>
            <div className={s.panel}>
                <div className={s.upload_panel}>
                    <Tabs tabs={tabs}
                          handlerChangeTabs={handlerChangeTabs} />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className={s.import_block}>
                            <ClaimTrip
                                className={`${s.icon} ${typeId === 1 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                                onClick={() => handleActionMiddleware(1, "default")}
                            />
                        </div>
                        <div className={s.import_block}>
                            <RemoveIcon
                                className={`${s.icon} ${typeId === 2 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                                onClick={() => handleActionMiddleware(4, "default")}
                            />
                        </div>
                        <div className={s.import_block}>
                            <AssignIcon
                                className={`${s.icon} ${typeId === 2 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                                onClick={() => handleActionMiddleware(99, "assign")}
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
                            carData && <div className={s.modalDiv}>
                                <div className={s.selectDiv}>
                                    <Select
                                        getOptionValue={(option: IOption) => option.value}
                                        getOptionLabel={(option: IOption) => t(option.label)}
                                        onChange={(options: IOption) => setCar(options)}
                                        /// onChange={handlerSetCar}
                                        options={carData}
                                        // value={selectedTitle}
                                        name={"Cars"}
                                        isMulti={false}
                                    />
                                    <div className={s.assign}>
                                        <Button
                                            isSubmit={true}
                                            type={"adminUpdate"}
                                            onClick={handlerSetCar}>
                                            {t("assign")}
                                        </Button>
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
            <div className={s.table_wrapper}>
                <CrudTable
                    titles={selectedTitle}
                    data={clients}
                    action
                    isInfo
                    isAssign
                    isClaim
                    isRemove
                    tableRef={tableRef}
                    handlerAction={handlerAction}
                    className={"pagination"}
                    selectedIds={ids}
                    typeId={typeId}
                    isDelete={false}
                    isAssignVendor={false}
                    isEdit={false}
                    isGetHistory={false}
                />
                <div className={s.detector} ref={ref} />
            </div>

        </>
    );
};
export default Home;
