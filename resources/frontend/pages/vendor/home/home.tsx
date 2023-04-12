import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/home";
import { getHomePageData, getTabId } from "../../../store/selectors";
import { homeAPI } from "../../../api/site-api/home-api";
import s from "../../../styles/home.module.scss";
import CrudTable from "../../../components/crud-table-user/crud-table";
import Select, { IOption } from "../../../components/select/select";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Modal from "react-modal";
import PopupModal from "../../../components/popup-modal/popup-modal";
import MultiSelectSort from "../../../components/select/sort-select";
import { vendorAPI } from "../../../api/site-api/vendor-api";
import Button from "../../../components/button/button";
import { actionsTabs } from "../../../store/tab";
import { toast } from "react-toastify";
import NavigationTab from "../../../components/navigation/navigationTab";
import customStyles from "../../../utils/style";

interface IHome {
    path: string;
}


const Home: React.FC<IHome> = () => {
    const { t } = useTranslation();
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
    const [loading, setLoading] = useState<boolean>(true);
    const [filtre, setfiltre] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [agreement, setAgreement] = useState<boolean>(false);
    const [status, setStatus] = useState<number | null>(null);
    const [carData, setCarData] = useState<Array<any>>(null);
    const [car, setCar] = useState<IOption>(null);
    const [query, setQuery] = useState("");
    const [reasons, setReasons] = useState<IOption>(null);
    const tableRef = useRef(null);
    const [date, setDate] = useState("");

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
            count: tripCount,
            selected: (typeId === 1)
        },
        {
            id: 4,
            name: "Rerouted trips",
            count: cancelCount,
            selected: (typeId === 4)
        },
        {
            id: 5,
            name: "Trips in Progress",
            count: progressCount,
            selected: (typeId === 5)
        },
        {
            id: 6,
            name: "Completed Trips",
            count: doneCount,
            selected: (typeId === 6)
        },
        {
            id: 2,
            name: "Available Trips",
            count: availableCount,
            selected: (typeId === 2)
        }
    ];

    const [titles, setTitles] = useState<string[]>([]);

    const openSearch = () => {
        console.log(open, "open");
        if (open) {
            setQuery("");
            setDate("");
            setLoading(true);
        } else {
            setOpen(!open);
        }

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
                await handleActionMiddleware(id, "assign");
                break;
            case "claim":
                setIds([id]);
                setStatus(1);
                setIsOpen(true);
                break;
            case "reRoute":
                /// setIds([id]);
                setStatus(4);
                const getReasonData = await vendorAPI.getReasonData();
                setCarData(getReasonData.data);
                setIsModalOpen(true);
                break;

        }
    };


    const getClientData = async (queryData: string, date: string) => {
        const titlesData = localStorage.getItem("titles");
        const homeData = await homeAPI.getClientData({
            titles: JSON.parse(titlesData),
            showMore: countRef.current,
            typeId: typeId,
            queryData: queryData,
            date: date
        });
        setDefaultData(homeData.titles);
        setDate(date);
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
    };


    useEffect(() => {
        (async () => {
            if (inView) {
                await getClientData(query, date);
                countRef.current++;
                //// setLoading(false);
            }
        })();
        return () => {
            ///   homeAPI.cancelRequest();
        };
    }, [inView]);
    useEffect(() => {
        (async () => {
            if (loading) {
                await getClientData(query, date);
                countRef.current = 1;
                setLoading(false);
            }
        })();
        return () => {
            ///   homeAPI.cancelRequest();
        };

    }, [loading]);

    const onSearchInput = async (event: { search: string }) => {
        setQuery(event.search);
        await getClientData(event.search, date);
    };

    const setFieldValue = async (name: string, dateData: string) => {
        setDate(dateData);
        await getClientData(query, dateData);
    };


    const changeFields = (options: Array<IOption>) => {
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
        dispatch(actionsTabs.fetching({ tabId: tabId }));
        setLoading(true);
    };


    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (agreement && ids.length > 0) {
        delay(200).then(async () => {
            await homeAPI.changeClientsTypes({ status, ids });
            setIds([]);
            setLoading(true);
            setAgreement(false);
        });
    }

    const handleActionMiddleware = async (id: number, action?: string) => {
        switch (action) {
            case "assign":
                const getCarData = await vendorAPI.getCarsDataForSelect("cars");
                setCarData(getCarData.cars);
                setIsModalOpen(true);
                break;
            case "reRoute":
                const getReasonData = await vendorAPI.getReasonData();
                setCarData(getReasonData.data);
                setIsModalOpen(true);
                break;
            case "default":
                setIsOpen(true);
                setStatus(id);
                break;
        }
    };
    const agreeWith = (callOrNot: boolean) => {
        setAgreement(callOrNot);
        setIsOpen(false);
    };
    const notAgreeWith = () => setIsOpen(false);


    const handlerCloseModal = () => {
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
        var getCarData;
        if (status === 4) {
            const reasonId = car.id;
            getCarData = await homeAPI.changeClientsTypes({ status, ids, reasonId });
            setIds([]);
        } else {
            const carId = parseFloat(car.value);
            getCarData = await vendorAPI.assignCarToClient({
                ids: ids,
                carId: carId
            });
        }

        if (getCarData.success) {
            const options = {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT
            };
            toast(t("record_successfully_updated"), options);
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


    return (
        clients && <>
            <div className={s.panel}>
                <div className={s.upload_panel}>
                    <NavigationTab
                        fileUploader={fileUploader}
                        filtre={filtre}
                        handleActionMiddleware={handleActionMiddleware}
                        handlerChangeTabs={handlerChangeTabs}
                        ids={ids}
                        date={date}
                        setFieldValue={setFieldValue}
                        onSearchInput={onSearchInput}
                        openSearch={openSearch}
                        setfiltre={setfiltre}
                        tableRef={tableRef}
                        tabs={tabs}
                        typeId={typeId}
                        open={open}
                        isClaimTrip
                        isReRoute
                        IsAssignCar
                        isShowFiltre
                        IsDateSearch
                    />
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
                                        styles={{
                                            menu: {
                                                width: "100%",
                                            },
                                            option: {
                                                width: "100%",
                                            }
                                        }}
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
            <div className={s.tableContainer}>
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
            </div>


        </>
    );
};
export default Home;
