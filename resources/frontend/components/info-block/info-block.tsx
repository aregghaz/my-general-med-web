import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./info-block.module.scss";


interface IProps {
    clientById: any,
    idData?: number,
    calculateRoute: (newData: any) => void
}


const InfoBlock: FC<IProps> = ({ clientById, calculateRoute }) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = clientById;
    const { t } = useTranslation();


    return (
        <div className={cls.block}>
            <div className={cls.items}>
                {
                    newData &&
                    <>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("fullName")}: </span>
                            {newData.fullName}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("date_of_service")}: </span>
                            {newData.date_of_service}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("pick_up")}: </span>
                            {newData.pick_up}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("drop_down")}: </span>
                            {newData.drop_down}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("pick_up_address")}: </span>
                            {newData.origin}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("origin_comment")}: </span>
                            {newData.origin_comment}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("origin_phone")}: </span>
                            {newData.origin_phone}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("destination")}: </span>
                            {newData.destination}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("destination_comments")}: </span>
                            {newData.destination_comments}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("destination_phone")}: </span>
                            {newData.destination_phone}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("weight")}: </span>
                            {newData.weight}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("height")}: </span>
                            {newData.height}
                        </div>

                        <div className={cls.item}>
                            <div className={cls.showBtn} onClick={() => calculateRoute(newData)}> Show map</div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default InfoBlock;
