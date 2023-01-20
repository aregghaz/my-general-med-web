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
    typeId:number
}


const Tabs: FC<IProps> = ({tabs, handlerChangeTabs, typeId}) => {

    const {t} = useTranslation()

    return (
        <div className={s.table_upper_tab}>
            {
                tabs.length >= 0 && tabs.map(tab => (
                    <div
                        className={s.table_upper_tab_item}
                        key={tab.id}
                        style={typeId == tab.id ? {
                            backgroundColor: "#4466b0",
                            color: "#fff"
                        } : { backgroundColor: "#ffffff", color: "#4466b0" }}
                        onClick={() => handlerChangeTabs(tab.id)}
                    >
                        {t(tab.name)}{tab.count && <span className={s.bage_count}>{tab.count}</span>}
                    </div>
                ))
            }

        </div>
    )
}

// @ts-ignore
export default Tabs;
