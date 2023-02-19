import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {IClientsData} from "../../types/home-types";
import cls from './info-block.module.scss'
import { IOption } from "../select/select";
import ImageGallery from "../image-gallery-carousel/image-gallery-carousel";


interface IProps {
    data:any
}


const InfoBlockDriver: FC<IProps> = ({data}) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = data
    const {t} = useTranslation()


    return (
        <div className={cls.block}>
            <div className={cls.panel}>
                <span className={`${cls.menu} ${cls.menu_active}`}>Driver Detail</span>
                <span className={cls.menu}>Notes</span>
            </div>
            <div className={cls.items}>
                {
                    newData &&
                    <>
                        <div className={cls.item}>
                            {/*<span className={cls.b_text}>{t('picture')}: </span>*/}
                            <img src={newData.picture} alt="" />
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('fullname')}: </span>
                            {newData.fullname}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('email')}: </span>
                            {newData.email}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('address')}: </span>
                            {newData.address}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('birthday')}: </span>
                            {newData.birthday}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('phone_number')}: </span>
                            {newData.phone_number}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('license')}: </span>
                            <a href = {newData.license} target = "_blank">Download license pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('sex_offender_check')}: </span>
                            <a href = {newData.sex_offender_check} target = "_blank">Download sex offender check  pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('motor_vehicle_record')}: </span>
                            <a href = {newData.motor_vehicle_record} target = "_blank">Download motor vehicle record pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('defensive_driving')}: </span>
                            <a href = {newData.defensive_driving} target = "_blank">Download defensive driving certificate pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('wheelchair_securement')}: </span>
                            <a href = {newData.wheelchair_securement} target = "_blank">Download dwheelchair securement certificate pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('pass_basic')}: </span>
                            <a href = {newData.pass_basic} target = "_blank">Download pass basic certificate pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('emt_1')}: </span>
                            <a href = {newData.emt_1} target = "_blank">Download EMT 1 certificate pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('first_aid')}: </span>
                            <a href = {newData.first_aid} target = "_blank">Download first aid and CP certificate pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('company_training')}: </span>
                            <a href = {newData.company_training} target = "_blank">Download company training letter pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('drug_test')}: </span>
                            <a href = {newData.drug_test} target = "_blank">Download drug test pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('fields')}: </span>
                            {newData.fields.lenght > 0 && newData.fields.map((el:IOption) => {
                                return <span>{el.label}</span>
                            })}
                        </div>

                        {/*<div className={cls.image_block}>*/}
                        {/*    <hr/>*/}
                        {/*    <ImageGallery*/}
                        {/*        images={newData.images}*/}
                        {/*    />*/}
                        {/*</div>*/}

                    </>
                }
            </div>
        </div>
    )
}


export default InfoBlockDriver;
