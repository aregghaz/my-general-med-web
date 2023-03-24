import React, { useEffect, useRef, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import s from "../../layouts/templates/list/list.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/adminUser";
import { getAdminUsersData } from "../../../store/selectors";
import { homeAPI } from "../../../api/site-api/home-api";
import { useInView } from "react-intersection-observer";
import NavigationTab from "../../../components/navigation/navigationTab";
import axios from "axios";

interface IVendors {
    path: string;
}

const Vendors: React.FC<IVendors> = () => {
    const dispatch = useDispatch();
    const crudKey = "vendors";
    const countRef = useRef(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [typeId, setTypeId] = useState<number>(2);
    const adminUsersData = useSelector(getAdminUsersData);
    const { userdata, operatorCount, vendorCount } = adminUsersData;
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [agreement, setAgreement] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const contentRef = useRef();
    const [ref, inView] = useInView({
        threshold: 1
    });

    useEffect(() => {
        (async () => {
            if ((inView)) {
                const data = await AdminApi.getAllVendorData(crudKey, typeId, query);
                dispatch(actions.fetching(
                    {
                        userdata: data.data,
                        operatorCount: data.operators,
                        vendorCount: data.vendors
                    }
                ));
                countRef.current++;
            }
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, [inView]);


    useEffect(() => {
        (async () => {
            if (loading) {
                const data = await AdminApi.getAllVendorData(crudKey, typeId, query);
                dispatch(actions.fetching(
                    {
                        userdata: data.data,
                        operatorCount: data.operators,
                        vendorCount: data.vendors
                    }
                ));
                countRef.current = 1;
                setLoading(false);
            }
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, [loading]);


    const handlerAction = async (action: string, id: number) => {
        switch (action) {
            case "history":
                await handlerGetActivityOperator(id);
                break;
            case "add":
                await handlerAddItem();
                break;
            case "edit":
                await handlerEditItem(id);
                break;
            case "getVendorUser":
                await handlerGetVendorUsers(id);
                break;
        }
    };

    const tabs = [
        {
            id: 2,
            name: "Vendor",
            count: vendorCount,
            selected: false
        },
        {
            id: 4,
            name: "Operator",
            count: operatorCount,
            selected: false
        }
    ];
    const handlerChangeTabs = async (tabId: number) => {
        setTypeId(tabId);
        setLoading(true);
    };
    const titles: Array<string> = [
        "id",
        typeId == 2 ? "companyName" : "fullName",
        "email",
        "address",
        "phone_number",
        "fields",
        "action"
    ];
    const handlerAddItem = () => navigate(`/admin/${crudKey}/create/${typeId}`);
    const handlerCloseModal = () => setIsModalOpen(false);
    const handlerEditItem = (id: number) => navigate(`/admin/${crudKey}/${id}/${typeId}`);
    const handlerGetVendorUsers = async (id: number) => navigate(`/admin/users/${id}`);
    const handlerGetActivityOperator = async (id: number) => navigate(`/admin/activity/${id}`);

    const [query, setQuery] = useState("");
    const tableRef = useRef(null);

    const onSearchInput = async (event: { search: string }) => {
        setQuery(event.search);
        setLoading(true);
    };
    const openSearch = () => {
        if (open) {
            setQuery("");
            setLoading(true);
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
                setLoading(true);
            } else {
                ///  setErrorMessage("please upload valid type!");
            }

        }
    };
    return (
        userdata &&
        <>
            <div className={s.upload_panel}>
                <NavigationTab
                    fileUploader={fileUploader}
                    handlerChangeTabs={handlerChangeTabs}
                    tabs={tabs}
                    typeId={typeId}
                    open={open}
                    onSearchInput={onSearchInput} openSearch={openSearch} tableRef={tableRef} />

            </div>


            <div ref={contentRef} className={s.table_wrapper}>
                <List
                    data={userdata}
                    titles={titles}
                    isDelete
                    isEdit
                    tableRef={tableRef}
                    isCreate
                    isGetInfo={false}
                    isGetItems={typeId === 2}
                    handlerAction={handlerAction}
                    paginated={false}
                    className={"pagination"}
                    isGetHistory={typeId === 4}
                />
            </div>
            <div className={s.detector} ref={ref} />
            {/*<Modal*/}
            {/*    isOpen={isModalOpen !== false}*/}
            {/*    style={customStyles}*/}
            {/*    onRequestClose={handlerCloseModal}*/}
            {/*>*/}
            {/*    <div className={s.modalBody}>*/}
            {/*        <div className={s.iconWrapper}>*/}
            {/*            <i className="cancelicon-"*/}
            {/*               onClick={handlerCloseModal}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <i className={`binicon- ${s.icon}`} />*/}
            {/*        <p className={s.text}>{t("do_you_want_to_delete")}</p>*/}
            {/*        <div className={s.buttons}>*/}
            {/*            <Button type={"green"}*/}
            {/*                    className={s.button}>{t("yes")}</Button>*/}
            {/*            <Button type={"transparent"} onClick={handlerCloseModal} className={s.button}>{t("no")}</Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}

        </>
    );
};


export default Vendors;
