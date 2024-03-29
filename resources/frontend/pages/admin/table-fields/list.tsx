import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

interface ITableFilds {
    path: string;
}

const TableFildsList: React.FC<ITableFilds> = () => {
    const dispatch = useDispatch();
    const crudKey = "tableFilds";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countPages, setCountPages] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [count, setCount] = useState(0);
    const [activeItem, setActiveItem] = useState(null);
    const [tabId, setTabId] = useState<number>(1);

    const [dataID, setDataID] = useState(null);


    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        (
            async () => {
                /// const data = await AdminApi.getAllStatusData(crudKey);
                //  setData(data.table);
                //  setCount(data.count);

            }
        )();
        // dispatch(actions.setTitles(titles))
        // dispatch(actions.clearData())
    }, []);


    const titles: Array<string> = [
        "id",
        "name",
        "slug"
    ];
    const handlerAddBeneficiaryItem = () => navigate(`/admin/users/create`);


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

    const HandlerPagination = (activeItem: number) => {
        const role = localStorage.getItem("role");
        localStorage.setItem("page", activeItem.toString());

    };
    const handlerGetclientData = (id: number) => {
        setDataID(id);

    };

    const handlerChangeTabs = (tabId: number) => {
        setTabId(tabId);
    };

    const tabs = [
        {
            id: 1,
            name: "gender",
            count: 0
        },
        {
            id: 2,
            name: "escortType",
            count: 0
        },
        {
            id: 3,
            name: "type_of_trip",
            count: 0
        },
        {
            id: 4,
            name: "request_type",
            count: 0
        },
        {
            id: 5,
            name: "status",
            count: 0
        }
    ];

    console.log(tabId, "tab id in table fields!!!!");
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
        data &&
        <>
            {/* <InfoBlock  items={data}/> */}
            <List
                data={data}
                titles={titles}
                isDelete={false}
                isEdit={false}
                isGetInfo={false}
                paginated={false}
                isCreate={false}
                isGetItems={false}
                isGetHistory={false}

                className={"pagination"}
            />


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
                    <p className={s.text}>{t("admin.do_you_want_to_delete")}</p>
                    <div className={s.buttons}>
                        <Button type={"green"} onClick={handlerDeleteItem}
                                className={s.button}>{t("admin.yes")}</Button>
                        <Button type={"transparent"} onClick={handlerCloseModal}
                                className={s.button}>{t("admin.no")}</Button>
                    </div>
                </div>
            </Modal>

        </>
    );
};


export default TableFildsList;
