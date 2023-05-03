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


const InfoBlockPatient: FC<IProps> = ({ data, is_admin,companyName,updatedField }) => {
    const newData = data;
    // newData.fullName
    // newData.insurance "faylna esi"
    // newData.insurance_exp "esi ira experation date-na"
    // newData.member_uniqie_identifer "ira unique identifierna"
    const { t } = useTranslation();
    return (
        <>
            <div className={cls.block}>
                <div className={cls.title}>
                    <span>Full Name:
                        <span className={cls.name}>
                            {newData.fullName}
                        </span>
                    </span>
                    <span>Member unique identifer:
                        <span className={cls.name}>
                            {newData.member_uniqie_identifer}
                        </span>
                    </span>
                </div>
                <div className={`${cls.infoItem} ${cls.infoItemDownload}`}>
                    <div className={updatedField==='insurance' ? ` ${cls.itemBorder}` :cls.itemBorder}>
                        <span className={cls.b_text}>{t('insurance')}: </span>
                        <a href ={newData.insurance} target = "_blank"><DownloadSvg/></a>
                        <br/>
                        <span><DriverFileSvg/> {newData.insurance_exp}</span>
                    </div>
                </div>
            </div>
        </>
    );
};


export default InfoBlockPatient;

