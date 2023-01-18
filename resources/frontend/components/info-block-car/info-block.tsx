import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {IClientsData} from "../../types/home-types";
import cls from './info-block.module.scss'
import { IOption } from "../select/select";
import ImageGallery from "../image-gallery-carousel/image-gallery-carousel";


interface IProps {
    data:any
}


const InfoBlockCar: FC<IProps> = ({data}) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = data.data
    const {t} = useTranslation()


    return (
        <div className={cls.block}>
            <div className={cls.panel}>
                <span className={`${cls.menu} ${cls.menu_active}`}>Trip Detail</span>
                <span className={cls.menu}>Notes</span>
            </div>
            <div className={cls.items}>
                {
                    newData &&
                    <>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('make')}: </span>
                            {newData.make.name}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('model')}: </span>
                            {newData.model.name}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('year')}: </span>
                            {newData.year.name}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('registration')}: </span>
                            {newData.registration}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('inspection')}: </span>
                            <a href = {newData.inspection} target = "_blank">Download inspection form pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('insurance')}: </span>
                            <a href = {newData.insurance} target = "_blank">Download auto insurance pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('liability')}: </span>
                            <a href = {newData.liability} target = "_blank">Download general and professional liability insurance pdf</a>
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('drivers')}: </span>
                            {newData.drivers.map((el:IOption) => {
                                return <span>{el.label}</span>
                            })}
                        </div>

                        <div className={cls.image_block}>
                            <hr/>
                            <ImageGallery
                                images={newData.images}
                            />
                        </div>

                    </>
                }
            </div>
        </div>
    )
}


export default InfoBlockCar;
