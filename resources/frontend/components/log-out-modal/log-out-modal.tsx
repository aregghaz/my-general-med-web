import React from "react";
import Modal from "react-modal";
import ReactModal from "react-modal";
import Button from "../button/button";
import { useTranslation } from "react-i18next";
import useWindowResize from "../../hooks/use-window-resize";
import LogOutIcon from "-!svg-react-loader!../../images/log-out.svg";
import { useNavigate } from "@reach/router";

import s from "./log-out-modal.module.scss";

Modal.setAppElement("body");

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

const customStylesMobile: ReactModal.Styles = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)"
    }
};

interface ILogOutModal {
    isOpen: boolean;
    logOut: () => void;
    handleCloseModal: () => void;
}

const LogOutModal: React.FC<ILogOutModal> = (
    {
        isOpen,
        handleCloseModal,
        logOut
    }) => {
    const { t } = useTranslation();
    const { width } = useWindowResize();
    const navigate = useNavigate();
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

                <LogOutIcon />
                <p className={s.text}>{t("do_you_want_to_log_out")}</p>
                <div className={s.buttons}>
                    <Button type={"green"} onClick={() => {
                        logOut();
                        return navigate("/");
                    }} className={s.button}>
                        {t("yes")}
                    </Button>
                    <Button type={"transparent"} onClick={handleCloseModal} className={s.button}>
                        {t("no")}
                    </Button>
                </div>
            </div>

        </Modal>
    );
};

export default LogOutModal;
