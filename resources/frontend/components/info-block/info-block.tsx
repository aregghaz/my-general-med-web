import React, {FC} from "react";
import cls from './info-block.module.scss'


interface IProps {
    items: any[],
    idData: number,
}


const InfoBlock: FC<IProps> = ({items, idData}) => {
    const infoData: any = items.find(item => item.id === idData);
    const newData = infoData ? infoData : items[0]

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
                            <span className={cls.b_text}>Res No: </span>
                            {newData.address}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>VIP: </span>
                            {newData.birthday}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>Miles: </span>
                            {newData.client_id}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>LOS: </span>
                            {newData.driver_id}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>Name: </span>
                            {newData.email}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>PU Address: </span>
                            {newData.fullName}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>DO Address: </span>
                            {newData.phone_number}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>TagName: </span>
                            {newData.role}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default InfoBlock
