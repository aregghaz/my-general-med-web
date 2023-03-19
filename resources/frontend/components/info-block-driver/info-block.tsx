import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./info-block.module.scss";
import EmailSvg from "-!svg-react-loader!../../images/email.svg";
import AddressSvg from "-!svg-react-loader!../../images/address.svg";
import DobSvg from "-!svg-react-loader!../../images/dob.svg";
import PhoneSvg from "-!svg-react-loader!../../images/phone.svg";
import DriverFileSvg from "-!svg-react-loader!../../images/driverFile.svg";
import DownloadSvg from "-!svg-react-loader!../../images/download.svg";


interface IProps {
    data: any;
    is_admin:boolean
    companyName?:string
    updatedField?:string| boolean
}


const InfoBlockDriver: FC<IProps> = ({ data, is_admin,companyName,updatedField }) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = data;
    const { t } = useTranslation();

    return (
        <div className={cls.block}>
            <div className={cls.items}>
                {
                    newData &&
                    <>
                        <div className={cls.driver}>
                            {companyName && <div className={cls.companyInfoLabel}>
                                <h4>{companyName}</h4>
                            </div>}
                            <div className={cls.driverInfoLabel}>
                                <h1>{newData.fullname}</h1>
                            </div>


                            <div className={cls.driverInfo}>
                                <div className={cls.driverPicture}>
                                    <div className={cls.item}>
                                        {/*<span className={cls.b_text}>{t('picture')} </span>*/}
                                        <img src={newData.picture} width="200px" height="400px" alt="" />
                                    </div>
                                </div>
                                <div className={cls.driverPersonal}>
                                    <div className={cls.item}>
                                        <span className={cls.b_text}><EmailSvg/> </span>
                                        {newData.email}
                                    </div>
                                    <div className={cls.item}>
                                        <span className={cls.b_text}><AddressSvg/> </span>
                                        {newData.address}
                                    </div>
                                    <div className={cls.item}>
                                        <span className={cls.b_text}><DobSvg/></span>
                                        {newData.birthday}
                                    </div>
                                    <div className={cls.item}>
                                        <span className={cls.b_text}><PhoneSvg/> </span>
                                        {newData.phone_number}
                                    </div>
                                </div>
                                {/*<div className={cls.driverActions}>*/}
                                {/*    {is_admin && <p>*/}
                                {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue ipsum*/}
                                {/*        et tellus congue congue. Aenean id est at sem tempor efficitur quis at tortor.*/}
                                {/*        Praesent vestibulum sem ac auctor sollicitudin. Aenean dignissim neque nec*/}
                                {/*        sollicitudin scelerisque. Cras rutrum convallis dui in aliquam. Aliquam quis*/}
                                {/*        magna fermentum, iaculis metus malesuada, ullamcorper dui. Nam maximus turpis*/}
                                {/*        quis diam vehicula, at vehicula lacus laoreet.*/}
                                {/*        Donec eget rhoncus tellus, ac dictum tortor. Pellentesque a vehicula tellus.*/}
                                {/*        Morbi efficitur tempor nisi, non tincidunt enim semper quis. Mauris in faucibus*/}
                                {/*        risus. Aenean in lorem lacus. Phasellus feugiat, urna ac faucibus ultrices,*/}
                                {/*        risus neque venenatis neque, sed hendrerit diam ligula ut tellus. Mauris sit*/}
                                {/*        amet ligula quam. Praesent ut metus facilisis, luctus nibh et, ultrices lacus.*/}
                                {/*        Suspendisse potenti. Quisque at dapibus neque, a mollis magna. In hac habitasse*/}
                                {/*        platea dictumst. Nunc scelerisque et elit gravida semper. Cras eu tincidunt*/}
                                {/*        metus, at vulputate purus. Curabitur sed faucibus turpis, nec dignissim orci.*/}
                                {/*        Integer sed hendrerit velit. Nullam condimentum lacus sit amet felis consequat*/}
                                {/*        auctor. Vestibulum nulla arcu, vestibulum non volutpat vel, elementum in nulla.*/}
                                {/*        Duis placerat maximus arcu, vel condimentum felis condimentum in. Pellentesque*/}
                                {/*        ultricies, diam ut commodo vulputate, dolor erat venenatis ex, id pretium massa*/}
                                {/*        tellus id nulla. Nulla convallis molestie metus, ut elementum neque efficitur*/}
                                {/*        id. Cras at nisi sit amet libero sodales fermentum vitae quis leo. Duis ac*/}
                                {/*        tempus est. Donec interdum odio id euismod vulputate. Pellentesque a est*/}
                                {/*        bibendum, eleifend velit vitae, laoreet velit.*/}
                                {/*    </p>}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={cls.documents}>
                            <div className={updatedField==='Driver License' ? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("Driver License")} </span>
                                <a href={newData.license} target="_blank"><DownloadSvg/></a><br />
                                <span><DriverFileSvg/> {newData.license_exp}</span>
                            </div>
                            <div className={updatedField == 'Sex Offender Check'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("sex_offender_check")} </span>
                                <a href={newData.sex_offender_check} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.sex_offender_check_exp}</span>
                            </div>
                            <div className={updatedField == 'Motor Vehicle Record'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("motor_vehicle_record")} </span>
                                <a href={newData.motor_vehicle_record} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.motor_vehicle_record_exp}</span>
                            </div>
                            <div className={updatedField == 'Defensive Driving Certificate'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("defensive_driving")} </span>
                                <a href={newData.defensive_driving} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.defensive_driving_exp}</span>
                            </div>
                            <div className={updatedField == 'Wheelchair Securement Certificate'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("wheelchair_securement")} </span>
                                <a href={newData.wheelchair_securement} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.wheelchair_securement_exp}</span>
                            </div>
                            <div className={updatedField == 'Pass Basic'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("pass_basic")} </span>
                                <a href={newData.pass_basic} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.pass_basic_exp}</span>
                            </div>
                            <div className={updatedField == 'EMT 1 Certificate'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("emt_1")} </span>
                                <a href={newData.emt_1} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.emt_1_exp}</span>
                            </div>
                            <div className={updatedField == 'First Aid and CPR Certificate'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("first_aid")} </span>
                                <a href={newData.first_aid} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.first_aid_exp}</span>
                            </div>
                            <div className={updatedField == 'Company Training Letter'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span
                                    className={cls.b_text}>{t("company_training")} {newData.company_training_exp}</span>
                                <a href={newData.company_training} target="_blank"><DownloadSvg/> </a>
                                <br />
                                <span><DriverFileSvg/> {newData.company_training_exp}</span>
                            </div>
                            <div className={updatedField == 'Drug Test'? `${cls.selected} ${cls.itemBorder}` :cls.itemBorder}>
                                <span className={cls.b_text}>{t("drug_test")} </span>
                                <a href={newData.drug_test} target="_blank"><DownloadSvg/></a>
                                <br />
                                <span><DriverFileSvg/> {newData.drug_test_exp}</span>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};


export default InfoBlockDriver;

