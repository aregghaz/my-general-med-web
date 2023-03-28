import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { homeAPI } from "../../../api/site-api/home-api";
import InfoBlockDriver from "../../../components/info-block-driver/info-block";
import { vendorAPI } from "../../../api/site-api/vendor-api";
import Tabs from "../../../components/tabs/tabs";
import CloseSvg from "-!svg-react-loader!../../../images/Close.svg";

interface Beneficiary {
    path: string;
}

const VendorUsers: React.FC<Beneficiary> = () => {
    const dispatch = useDispatch();
    const crudKey = "users";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [tabIdSelected, setTabIdSelected] = useState(3);
    const [itemData, setItemData] = useState({});
    const [tabs, setTabs] = useState([]);
    const [typeName, setTypeName] = useState<string>("driver");
    const navigate = useNavigate();
    const { t } = useTranslation();


    useEffect(() => {
        (async () => {
            const data = await homeAPI.getVendorData(
                tabIdSelected
            );
            setData(data.data);
            setTabs(data.roles);
        })();
        return () => {
            homeAPI.cancelRequest();
        };
    }, [tabIdSelected]);

    const titles: Array<string> = [
        "id",
        "fullName",
        "email",
        "address",
        "phone_number",
        "birthday",
        "action"
    ];

    const handlerAddItem = () => navigate(`/users/${typeName}/create`);

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
    const handlerEditItem = (id: number) =>
        navigate(`/users/${typeName}/${id}`);


    const HandlerPagination = (activeItem: number) => {
        const role = localStorage.getItem("role");
        localStorage.setItem("page", activeItem.toString());
    };

    const handlerChangeTabs = async (tabId: number) => {
        setTabIdSelected(tabId);
        // setLoading(true)
    };
    const handlerGetItemData = async (id: number) => {
        const data = await vendorAPI.getItemData("vendorClients", id);

        setItemData(data);
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
    const handlerAction = async (action: string, id: number) => {
        switch (action) {
            case "get":
                await handlerGetItemData(id);
                break;
            case "add":
                await handlerAddItem();
                break;
            case "edit":
                await handlerEditItem(id);
                break;

        }
    };
    const handlerClose = () => setItemData({});


    return (
        data && (
            <>

                <Tabs tabs={tabs}
                      handlerChangeTabs={handlerChangeTabs} />
                {Object.keys(itemData).length > 0 && <div className={s.itemInfo}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "end",
                        justifyContent: "end",
                        padding: "10px 10px 0 0"
                    }}><CloseSvg onClick={handlerClose} /></div>
                    <InfoBlockDriver data={itemData} is_admin={false} />
                </div>}
                <div className={Object.keys(itemData).length > 0 ? s.itemOpen : s.ItemClose}>
                    <List
                        data={data}
                        titles={titles}
                        isDelete
                        isEdit
                        paginated={false}
                        isCreate
                        isGetInfo
                        handlerAction={handlerAction}
                        className={"pagination"}
                        isGetHistory={false}
                        isGetItems={false} />
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
                                {t("admin.do_you_want_to_deletee")}
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
                </div>
            </>
        )
    );
};

export default VendorUsers;
