import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import s from "./tabs.module.scss";

interface ITabs{
    name:string
    count?:number
    id:number

}
interface IProps {
    tabs: Array<ITabs>,
    idData?: number,
    handlerChangeTabs:(id:number)=>void,
    typeId:number,
    handleActionMiddleware?:(id:number)=>void,
    ids?:Array<number>
}


const Tabs: FC<IProps> = ({tabs, handlerChangeTabs, typeId,handleActionMiddleware,ids}) => {

    const {t} = useTranslation()

    return (
        <div className={s.table_upper_tab}>
            {
                tabs.length >= 0 && tabs.map(tab => (
                    <div
                        className={s.table_upper_tab_item}
                        key={tab.id}
                        onClick={() => handlerChangeTabs(tab.id)}
                    >
                        {t(tab.name)}{tab.count && <span className={s.bage_count}>{tab.count}</span>}
                    </div>
                ))
            }
            <div className={s.upload_panel}>
                <div
                    className={`${s.action_block}  ${typeId === 1 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                    onClick={() => handleActionMiddleware(1)}
                >
                    Claim Trip
                </div>
                <div
                    className={`${s.action_block} ${typeId === 2 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                    onClick={() => handleActionMiddleware(4)}
                >
                    Cancel Trip
                </div>
                <div
                    className={`${s.action_block} ${typeId === 2 || typeId === 4 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                    onClick={() => handleActionMiddleware(99)}
                >
                    Assign to car
                </div>
            </div>

        </div>
    )
}

// @ts-ignore
export default Tabs;
