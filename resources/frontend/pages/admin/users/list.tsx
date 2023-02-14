import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";

import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { actions } from "../../../store/vendorUsers";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../../components/tabs/tabs";
import { adminVendorUsers } from "../../../store/selectors";

interface Beneficiary {
    path: string;
    id?: number;
}

const Users: React.FC<Beneficiary> = ({ id }) => {
    const dispatch = useDispatch();
    const crudKey = "users";
    const { userdata, driversCount, operatorsCount } = useSelector(adminVendorUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countPages, setCountPages] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [count, setCount] = useState(0);
    const [activeItem, setActiveItem] = useState(null);
    const [tabId, setTabId] = useState();
    const [tabIdSelected, setTabIdSelected] = useState(3);
    const [dataID, setDataID] = useState(null);
    const [typeName, setTypeName] = useState<string>("driver");
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if(isLoading){
                const data = await AdminApi.getVendorUsers(id, tabIdSelected);
                dispatch(actions.fetching(
                    {
                        userdata: data.data,
                        driversCount: data.drivers,
                        operatorsCount: data.operators
                    }
                ));
                setLoading(false);
            }

        })();
        // dispatch(actions.clearData())
    }, [tabIdSelected, isLoading]);

    const titles: Array<string> = [
        "id",
        "fullName",
        "email",
        "address",
        "phone_number",
        ///"birthday",
        ///"role",
       /// "image",
    ];

    const handlerAddBeneficiaryItem = () => navigate(`/admin/${crudKey}/create/${id}`);

    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlerDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const handlerDeleteItem = () => {

    };
    const handlerEditBeneficiaryItem = (id: number) =>
        navigate(`/admin/${crudKey}/${id}`);
    const HandlerGetProducts = (id: number) =>
        navigate(`/admin/users-products/${id}`);




    const [typeId, setTypeId] = useState<number>(1);
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
    const tabs = [
        {
            id: 3,
            name: "Drivers",
            count: driversCount
        },
        {
            id: 4,
            name: "Operators",
            count: operatorsCount
        }
    ];
    const handleActionMiddleware = () => {

    };
    const handlerChangeTabs = async (tabId: number) => {
        setTabIdSelected(tabId);
        setLoading(true);
    };

    return (
        userdata && (
            <>
                {/* <InfoBlock  items={data}/> */}
                <Tabs tabs={tabs} handlerChangeTabs={handlerChangeTabs} />

                <List
                    data={userdata}
                    titles={titles}
                    paginated={false}
                    tabId={tabIdSelected}
                    handlerAddItem={handlerAddBeneficiaryItem}
                    handlerDeleteItem={handlerDeleteModal}
                    handlerEditItem={handlerEditBeneficiaryItem}
                    HandlerGetProducts={HandlerGetProducts}
                />
                <Modal
                    isOpen={isModalOpen !== false}
                    style={customStyles}
                    onRequestClose={handlerCloseModal}
                >
                    <div className={s.modalBody}>
                        <div className={s.iconWrapper}>
                            <i
                                className="cancelicon-"
                                onClick={handlerCloseModal}
                            />
                        </div>

                        <i className={`binicon- ${s.icon}`} />
                        <p className={s.text}>
                            {t("admin.do_you_want_to_delete")}
                        </p>
                        <div className={s.buttons}>
                            <Button
                                type={"green"}
                                onClick={handlerDeleteItem}
                                className={s.button}
                            >
                                {t("admin.yes")}
                            </Button>
                            <Button
                                type={"transparent"}
                                onClick={handlerCloseModal}
                                className={s.button}
                            >
                                {t("admin.no")}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    );
};

export default Users;
