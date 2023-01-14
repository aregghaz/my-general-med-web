import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import Select, {
    IOption,
    IOptionMultiselect,
} from "../../../components/select/select";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import InfoBlock from "../../../components/info-block/info-block";
import { actions } from "../../../store/home";
import { useDispatch } from "react-redux";

interface Beneficiary {
    path: string;
    id?:number
}

const Users: React.FC<Beneficiary> = ({id}) => {
    const dispatch = useDispatch();
    const crudKey = "users";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countPages, setCountPages] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [count, setCount] = useState(0);
    const [activeItem, setActiveItem] = useState(null);
    const [tabId, setTabId] = useState(1);
    const [tabIdSelected, setTabIdSelected] = useState(1);
    const [dataID, setDataID] = useState(null);
    const [tabs, setTabs] = useState([]);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            const homeData = await AdminApi.getVendorUsers(id)
            setData(homeData.data);
           /// setTabs(data.roles)
        })();
        // dispatch(actions.setTitles(titles))
        // dispatch(actions.clearData())
    }, [tabIdSelected]);

    const titles: Array<string> = [
        "id",
        "fullName",
        "email",
        "address",
        "phone_number",
        "birthday",
        "role",
        "image",
        "action",
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
        AdminApi.delete(crudKey, deleteId).then((data) => {
            setData(data.data.beneficiaries);
            setIsModalOpen(false);
        });
    };
    const handlerEditBeneficiaryItem = (id: number) =>
        navigate(`/admin/${crudKey}/${id}`);
    const HandlerGetProducts = (id: number) =>
        navigate(`/admin/users-products/${id}`);

    const HandlerPagination = (activeItem: number) => {
        const role = localStorage.getItem("role");
        localStorage.setItem("page", activeItem.toString());
    };
    const handlerGetClientData = (id: number) => {
        setDataID(id);
    };
    const handlerChangeTabs = async (tabId: number) => {
        setTabIdSelected(tabId);
        // setLoading(true)
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
            height: "290px",
        },
        overlay: {
            zIndex: 400,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(5px)",
        },
    };

    return (
        data && (
            <>
                {/* <InfoBlock  items={data}/> */}
                <List
                    data={data}
                    titles={titles}
                    isDelete
                    isEdit
                    paginated={false}
                    isCreate
                    tabs={tabs}
                    tabId={tabId}
                    handlerAddItem={handlerAddBeneficiaryItem}
                    handlerDeleteItem={handlerDeleteModal}
                    handlerEditItem={handlerEditBeneficiaryItem}
                    HandlerPagination={HandlerPagination}
                    HandlerGetProducts={HandlerGetProducts}
                    //handlerGetClientData={handlerGetClientData}
                    count={count}
                    handlerChangeTabs={handlerChangeTabs}
                    activeItem={activeItem}
                    className={"pagination"}
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
