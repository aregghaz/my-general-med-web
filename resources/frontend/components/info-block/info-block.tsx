import React, {FC} from "react";
import { useTranslation } from "react-i18next";
import { IClientsData } from "../../types/home-types";
import cls from './info-block.module.scss'


interface IProps {
    items:IClientsData,
    idData?: number,
}


const InfoBlock: FC<IProps> = ({items}) => {
   /// const infoData: any = items.find(item => item.id === idData);
    const newData =items

    const {t} = useTranslation()

    return (
        <div className={cls.block}>
            <div className={cls.panel}>
                <span className={`${cls.menu} ${cls.menu_active}`}>Trip Detail</span>
                <span className={cls.menu}>Notes</span>
            </div>
            {/* <div className={cls.items}>
                {
                    newData &&
                    <>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('id')}: </span>
                            {newData.id}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('client_id')}: </span>
                            {newData.client_id}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('driver_id')}: </span>
                            {newData.driver_id}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('surname')}: </span>
                            {newData.surname}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('name')}: </span>
                            {newData.name}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('pick_up_address')}: </span>
                            {newData.pick_up_address}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('drop_down_address')}: </span>
                            {newData.drop_down_address}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('apartament_number')}: </span>
                            {newData.apartament_number}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('birthday')}: </span>
                            {newData.birthday}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('email')}: </span>
                            {newData.email}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('email')}: </span>
                            {newData.email}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('id_number')}: </span>
                            {newData.id_number}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('phone_number')}: </span>
                            {newData.phone_number}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('ccn')}: </span>
                            {newData.ccn}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('pick_up')}: </span>
                            {newData.pick_up}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('drop_down')}: </span>
                            {newData.drop_down}
                        </div>
                     
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('status')}: </span>
                            {newData.status}
                        </div>
                    </>
                }
            </div> */}
        </div>
    )
}

export default InfoBlock
