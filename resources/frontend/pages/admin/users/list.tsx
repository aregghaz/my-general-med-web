import React, { useEffect, useRef, useState } from "react";
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
import NavigationTab from "../../../components/navigation/navigationTab";
import axios from "axios";

interface Beneficiary {
    path: string;
    id?: number;
}

const Users: React.FC<Beneficiary> = ({ id }) => {
    const dispatch = useDispatch();
    const crudKey = "users";
    const { userdata, driversCount, operatorsCount } = useSelector(adminVendorUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabIdSelected, setTabIdSelected] = useState(3);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (isLoading) {
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
        "birthday",
        "actions",
        /// "image",
    ];

    const handlerAddItem = () => navigate(`/admin/${crudKey}/create/${id}`);

    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlerDeleteItem = () => {

    };
    const handlerEditItem = (id: number) =>
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
            count: driversCount,
            selected:false,
        },
        {
            id: 4,
            name: "Operators",
            count: operatorsCount,
            selected:false,
        }
    ];
    const handleActionMiddleware = () => {

    };
    const handlerChangeTabs = async (tabId: number) => {
        setTabIdSelected(tabId);
        setLoading(true);
    };
    const handlerAction = async (action: string, id: number) => {
        switch (action) {
            case "add":
                await handlerAddItem();
                break;
            case "edit":
                await handlerEditItem(id);
                break;

        }
    };

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const tableRef = useRef(null);

    const onSearchInput = async (event: { search: string }) => {

    };
    const openSearch = () => {
        if (open) {
            setQuery("");
            ///  setLoading(true);
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
                /// setLoading(true);
            } else {
                ///  setErrorMessage("please upload valid type!");
            }

        }
    };
    return (
        userdata && (
            <>
                {/* <InfoBlock  items={data}/> */}

                <div className={s.upload_panel}>
                    <NavigationTab
                        fileUploader={fileUploader}
                        handlerChangeTabs={handlerChangeTabs}
                        tabs={tabs}
                        typeId={tabIdSelected}
                        open={open}
                        onSearchInput={onSearchInput} openSearch={openSearch} tableRef={tableRef} />

                </div>
                <List
                    data={userdata}
                    titles={titles}
                    handlerAction={handlerAction}
                    isDelete={true}
                    isEdit
                    tableRef={tableRef}
                    isGetHistory
                    isCreate={false}
                    isGetInfo={false}
                    isGetItems={false}
                    paginated={false}
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
