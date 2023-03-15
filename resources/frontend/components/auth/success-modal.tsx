import React from "react";
import GoodLuckIcon from "-!svg-react-loader!../../images/good-luck-icon.svg";
import { useTranslation } from "react-i18next";

import s from "./auth.module.scss";


const SuccessModal = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.successModal}>
            <GoodLuckIcon />
            <p>{t("successMessageRegistration")}</p>
        </div>
    );
};


export default SuccessModal;
