import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {IClientsData} from "../../types/home-types";
import cls from './info-block.module.scss'


interface IProps {
    clientById: any,
    idData?: number,
    calculateRoute:(newData:any)=>void
}


const InfoBlock: FC<IProps> = ({clientById,calculateRoute}) => {
    /// const infoData: any = items.find(item => item.id === idData);
    const newData = clientById[0]
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
                            <span className={cls.b_text}>{t('name')}: </span>
                            {newData.name+' '+newData.surname}
                        </div>
                       
        
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('date_of_service')}: </span>
                            {newData.date_of_service}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('appointment_time')}: </span>
                            {newData.appointment_time}
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
                            <span className={cls.b_text}>{t('pick_up_address')}: </span>
                            {newData.origin.city +' ' +  newData.origin.street +' ' +  newData.origin.suite}
                  
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('destination')}: </span>
                            { newData.destination.city +' ' +  newData.destination.street +' ' +  newData.destination.suite}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('origin_comment')}: </span>
                            {newData.origin_comment}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t('destination_comments')}: </span>
                            {newData.destination_comments}
                        </div>

                        <div className={cls.item} onClick={() => calculateRoute(newData)}>
                           
                          Show map
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

// @ts-ignore
export default InfoBlock;
