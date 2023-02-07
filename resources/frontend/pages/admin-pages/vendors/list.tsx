import React, { useEffect, useRef, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/adminUser";
import Tabs from "../../../components/tabs/tabs";
import { getAdminUsersData } from "../../../store/selectors";
import { homeAPI } from "../../../api/site-api/home-api";
import { useInView } from "react-intersection-observer";

interface IVendors {
    path: string;
}

const Vendors: React.FC<IVendors> = () => {
    const dispatch = useDispatch();
    const crudKey = "vendors";
    const countRef = useRef(2);

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countPages, setCountPages] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [count, setCount] = useState({ from: 0, to: 10 });
    const [activeItem, setActiveItem] = useState(null);
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
            if ((inView || loading) && !open) {
                const data = await AdminApi.getAllVendorData(crudKey, typeId, "");
                data.to;
                setCount({ from: data.to - 3, to: data.to + 5 });
                dispatch(actions.fetching(
                    {
                        userdata: data.data,
                        operatorCount: data.operators,
                        vendorCount: data.vendors
                    }
                ));
                countRef.current++;
                setLoading(false);
            }
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, [inView, loading, agreement]);

    const tabs = [
        {
            id: 2,
            name: "Vendor",
            count: vendorCount
        },
        {
            id: 4,
            name: "Operator",
            count: operatorCount
        }
    ];
    const handlerChangeTabs = async (tabId: number) => {
        /// setIds([]);
        setTypeId(tabId);
        setLoading(true);
    };
    const titles: Array<string> = [
        "id",
        "companyName",
        "email",
        "address",
        "phone_number",
        "fields",
        "action"
    ];
    const handlerAddItem = () => navigate(`/admin/${crudKey}/create/${typeId}`);


    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlerDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };


    const handlerDeleteItem = () => {

        AdminApi.delete(crudKey, deleteId).then(data => {
            setData(data.data.beneficiaries);
            setIsModalOpen(false);
        });
    };
    const handlerEditBeneficiaryItem = (id: number) => navigate(`/admin/${crudKey}/${id}`);
    const HandlerGetProducts = (id: number) => navigate(`/admin/users-products/${id}`);

    const HandlerPagination = async (activeItem: number) => {
        const query = localStorage.getItem("query");
        ///   const homeData = await AdminApi.getAllData(crudKey, activeItem + 1, query ? query : '')
        //    setCount({from: homeData.current_page, to: homeData.current_page + 5})
        //    setData(homeData.data)
        ///  const role = localStorage.getItem('role');
        localStorage.setItem("page", activeItem.toString());

    };


    const handlerGetVendorUsers = async (id: number) => {
        navigate(`/admin/users/${id}`);
    };
    const customStyles: ReactModal.Styles = {
        content: {
            position: "fixed",
            border: "none",
            overflowY: "unset",
            outline: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "290px"
        },
        overlay: {
            zIndex: 400,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(5px)"
        }
    };


    return (
        userdata &&
        <>
            <div style={{
                padding: 10
                /// border: 1px solid #ddd;
                ///  background-color: $whiteColor;

            }}>
                <Tabs typeId={typeId} tabs={tabs} handlerChangeTabs={handlerChangeTabs} />

            </div>

            <div ref={contentRef} className={s.table_wrapper}>
            <List
                data={userdata}
                titles={titles}
                isDelete
                isEdit
                isCreate
                isGetItems
                handlerAddItem={handlerAddItem}
                handlerDeleteItem={handlerDeleteModal}
                handlerEditItem={handlerEditBeneficiaryItem}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetProducts}
                handlerGetVendorUsers={handlerGetVendorUsers}
                count={count}
                paginated={true}
                activeItem={activeItem}
                className={"pagination"}
            />
            </div>
            <div className={s.detector} ref={ref}/>
            <Modal
                isOpen={isModalOpen !== false}
                style={customStyles}
                onRequestClose={handlerCloseModal}
            >
                <div className={s.modalBody}>
                    <div className={s.iconWrapper}>
                        <i className="cancelicon-"
                           onClick={handlerCloseModal}
                        />
                    </div>

                    <i className={`binicon- ${s.icon}`} />
                    <p className={s.text}>{t("do_you_want_to_delete")}</p>
                    <div className={s.buttons}>
                        <Button type={"green"} onClick={handlerDeleteItem}
                                className={s.button}>{t("yes")}</Button>
                        <Button type={"transparent"} onClick={handlerCloseModal} className={s.button}>{t("no")}</Button>
                    </div>
                </div>
            </Modal>

        </>
    );
};


export default Vendors;
