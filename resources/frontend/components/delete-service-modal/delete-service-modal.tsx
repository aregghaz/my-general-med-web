import React from "react";
import Modal from "react-modal";
import ReactModal from "react-modal";
import Button from "../button/button";
import { useTranslation } from "react-i18next";
import useWindowResize from "../../hooks/use-window-resize";

import s from "./delete-service-modal.module.scss";


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
        width: "600px"

    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)"
    }
};

const customStylesMobile: ReactModal.Styles = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        height: "25%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)"
    }
};

interface IDeleteServiceModal {
    id: number;
    isOpen: boolean;
    handleCloseModal: () => void;
    handlerDeleteItem: (id: number) => void;
}

const DeleteServiceModal: React.FC<IDeleteServiceModal> = (
    {
        id,
        isOpen,
        handleCloseModal,
        handlerDeleteItem
    }) => {
    const { t } = useTranslation();
    const { width } = useWindowResize();

    const handlerDelete = () => {
        handlerDeleteItem(id);
        handleCloseModal();
    };

    return (
        <Modal
            isOpen={isOpen !== false}
            style={width < 767 ? customStylesMobile : customStyles}
            onRequestClose={handleCloseModal}
        >
            <div className={s.modalBody}>
                <div className={s.iconWrapper}>
                    <i className="cancelicon-"
                       onClick={handleCloseModal}
                    />
                </div>

                <i className={`binicon- ${s.icon}`} />
                <p className={s.text}>{t("Do you want to delete")}</p>
                <div className={s.buttons}>
                    <Button type={"green"} onClick={handlerDelete}
                            className={s.button}>{t("yes")}</Button>
                    <Button type={"transparent"} onClick={handleCloseModal} className={`${s.button} ${s.buttonNo}`}>{t("no")}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteServiceModal;
