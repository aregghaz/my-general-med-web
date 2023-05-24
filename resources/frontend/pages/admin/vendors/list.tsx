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
import DeleteServiceModal from "../../../components/delete-service-modal/delete-service-modal";

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
    const [loading, setLoading] = useState<boolean>(true);
    const [agreement, setAgreement] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const contentRef = useRef();
    const [ref, inView] = useInView({
        threshold: 1
    });


    useEffect(() => {
        (async () => {
            console.log(inView, "inView");
            if ((inView)) {
                await getVendorData(2);
            }
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, [inView]);

    const getVendorData = async (action: number) => {
        const data = await AdminApi.getAllVendorData(crudKey, typeId, query);
        dispatch(actions.fetching(
            {
                userdata: data.data,
                operatorCount: data.operators,
                vendorCount: data.vendors
            }
        ));
        action == 1 ? countRef.current = 1 : countRef.current++;

        setLoading(false);
    };
    useEffect(() => {

        (async () => {

            if (loading) {
                await getVendorData(1);
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
            case "price":
                await navigate(`/admin/priceList/${id}`);
                break;
            case "delete":
                await setIsModalOpen(true);
                break;
        }
    };

    const tabs = [
        {
            id: 2,
            name: "vendors",
            count: vendorCount,
            selected: false
        },
        {
            id: 4,
            name: "operator",
            count: operatorCount,
            selected: false
        }
    ];
    const handlerChangeTabs = async (tabId: number) => {
        setTypeId(tabId);
        setLoading(true);
    };
    var titles: Array<string> = []
    if(typeId == 2) {
         titles = [
            "id",
            "companyName",
            "email",
            "address",
            "phone_number",
            "fields",
            "losService",
            "pages",
            "action"
        ];
    }else{
         titles = [
            "id",
            "fullName",
            "email",
            "address",
            "phone_number",
            "fields",
            "pages",
            "action"
        ];
    }

    const handlerAddItem = () => navigate(`/admin/${crudKey}/create/${typeId}`);
    const handlerCloseModal = () => setIsModalOpen(!isModalOpen);
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

    const handleDeleteItem = () => {
        console.log("delete code here")
    }
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
                    isPrice
                    isGetInfo={false}
                    isGetItems={typeId === 2}
                    handlerAction={handlerAction}
                    paginated={false}
                    className={"pagination"}
                    isGetHistory={typeId === 4}
                />
                <div className={s.detector} ref={ref} />
            </div>

            <DeleteServiceModal id={1} isOpen={isModalOpen} handleCloseModal={handlerCloseModal} handlerDeleteItem={handleDeleteItem}/>


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
