import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../api/admin-api/admin-api";
import List from "../../layouts/templates/list/list";
import { useNavigate } from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { vendorAPI } from "../../../api/site-api/vendor-api";
import InfoBlockCar from "../../../components/info-block-car/info-block";
import customStyles from "../../../utils/style";
import { homeAPI } from "../../../api/site-api/home-api";
import CloseSvg from "-!svg-react-loader!../../../images/Close.svg";

interface Beneficiary {
    path: string;
}

const Cars: React.FC<Beneficiary> = () => {
    const dispatch = useDispatch();
    const crudKey = "cars";
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countPages, setCountPages] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [count, setCount] = useState(0);
    const [ids, setIds] = useState(0);

    const [dataID, setDataID] = useState(null);


    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        (
            async () => {
                const data = await vendorAPI.getCarsData(crudKey);
                setData(data.cars);
            }
        )();
        // dispatch(actions.setTitles(titles))
        // dispatch(actions.clearData())
    }, []);


    const titles: Array<string> = [
        "id",
        "drivers",
        "make",
        "model",
        "year",
        "action"
    ];
    const handlerAddItem = () => navigate(`cars/create`);


    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlerDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };


    const handlerDeleteItem = () => {
        homeAPI.delete(crudKey).then(data => {

            setIsModalOpen(false);
        });
    };

    const handlerEditItem = (id: number) => navigate(`/${crudKey}/${id}`);

    const handlerGetItemData = async (id: number) => {
        const data = await vendorAPI.getItemData(crudKey, id);
        setItemData(data);
        setDataID(id);

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
            case "delete":
                await handlerDeleteModal(id);
                break;
        }
    };

    const handlerClose = () => setItemData({});
    return (
        data &&
        <>
            {Object.keys(itemData).length > 0 &&

                <div className={s.itemInfo}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "end",
                        justifyContent: "end",
                        padding: "10px 10px 0 0"
                    }}><CloseSvg onClick={handlerClose} /></div>
                    <InfoBlockCar data={itemData} is_admin={false} /></div>}
            <div className={Object.keys(itemData).length > 0 ? s.itemOpen : s.ItemClose}>
                <List
                    data={data}
                    titles={titles}
                    isDelete
                    isEdit
                    handlerAction={handlerAction}
                    paginated={false}
                    isCreate
                    isGetInfo
                    className={`pagination ${s.carsTable}`}
                    isGetHistory={false}
                    isGetItems={false}
                />
            </div>

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

                    <div className={s.modalContent}>
                        <i className={`binicon- ${s.icon}`} />
                        <p className={s.text}>{t("Do you want to delete")}</p>
                        <div className={s.buttons}>
                            <Button type={"green"} onClick={handlerDeleteItem}
                                    className={`${s.button} ${s.yesButton}`}>{t("yes")}</Button>
                            <Button type={"transparent"} onClick={handlerCloseModal}
                                    className={s.button}>{t("no")}</Button>
                        </div>
                    </div>

                </div>
            </Modal>

        </>
    );
};


export default Cars;
