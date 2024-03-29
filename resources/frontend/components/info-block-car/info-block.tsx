import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {IClientsData} from "../../types/home-types";
import cls from './info-block-vendor.module.scss'
import { IOption } from "../select/select";
import ImageGallery from "../image-gallery-carousel/image-gallery-carousel";
import DriverFileSvg from "-!svg-react-loader!../../images/driverFile.svg";
import DownloadSvg from "-!svg-react-loader!../../images/download.svg";

interface IProps {
    data:any,
    is_admin:boolean,
    companyName?:string,
    updatedField?:string,


}


const InfoBlockCar: FC<IProps> = ({data, is_admin,companyName,updatedField}) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = data.data
    const {t} = useTranslation()
    return (
        <div className={cls.block}>
            {
                newData &&
                <>
                    <div className={cls.carImgBox}>
                        <ImageGallery
                            images={newData.images}
                        />
                    </div>
                    <div className={cls.carInfoBox}>
                        {companyName && <div className={cls.companyInfoLabel}>
                            <h4>{companyName}</h4>
                        </div>}
                        <div className={cls.infoItem}>
                            <span className={cls.b_text}>{t('carModel')}: </span>
                            {newData.make.name}
                        </div>
                        <div className={cls.infoItem}>
                            <span className={cls.b_text}>{t('carModel')}: </span>
                            {newData.model.name}
                        </div>
                        <div className={cls.infoItem}>
                            <span className={cls.b_text}>{t('year')}: </span>
                            {newData.year.name}
                        </div>
                        <div className={cls.infoItem}>
                            <span className={cls.b_text}>{t('carRegistration')}: </span>
                            {newData.registration}
                        </div>
                        <div className={cls.infoItem}>
                            <span className={cls.b_text}>{t('drivers')}: </span>
                            {newData.drivers.map((el:IOption) => {
                                return <>{el.label}</>
                            })}
                        </div>
                        <div className={`${cls.infoItem} ${cls.infoItemDownload}`}>
                            <div className={updatedField==='Car inspection' ? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t('carInspection')}: </span>
                                <a href = {newData.inspection} target = "_blank"><DownloadSvg/></a>
                                <br/>
                                <span><DriverFileSvg/> {newData.inspection_exp}</span>
                            </div>
                        </div>

                        <div className={`${cls.infoItem} ${cls.infoItemDownload}`}>
                            <div className={updatedField==='Car liability' ? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t('Car liability')}: </span>
                                <a href = {newData.liability} target = "_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.liability_exp}</span>
                            </div>
                        </div>
                        <div className={`${cls.infoItem} ${cls.infoItemDownload}`}>
                            <div className={updatedField==='Car insurance' ? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t('Car insurance')}: </span>
                                <a href = {newData.insurance} target = "_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.insurance_exp}</span>
                            </div>
                        </div>
                    </div>

                </>
            }
        </div>
    )
}


export default InfoBlockCar;




// <div className={cls.item_block}>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carModel')}: </span>
//         {newData.make.name}
//     </div>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carModel')}: </span>
//         {newData.model.name}
//     </div>
//
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('year')}: </span>
//         {newData.year.name}
//     </div>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carRegistration')}: </span>
//         {newData.registration}
//     </div>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carInspection')}: </span>
//         <a href = {newData.inspection} target = "_blank">Download</a><br/>
//         <span>Expiration date : {newData.inspection_exp}</span>
//     </div>
//
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carInsurance')}: </span>
//         <a href = {newData.insurance} target = "_blank">Download</a><br/>
//         <span>Expiration date : {newData.insurance_exp}</span>
//
//     </div>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('carLiability')}: </span>
//         <a href = {newData.liability} target = "_blank">Download</a><br/>
//         <span>Expiration date : {newData.liability_exp}</span>
//     </div>
//     <div className={cls.item}>
//         <span className={cls.b_text}>{t('drivers')}: </span>
//         {newData.drivers.map((el:IOption) => {
//             return <span>{el.label}</span>
//         })}
//     </div>
//
// </div>
// <div className={cls.item_block}>

// </div>
