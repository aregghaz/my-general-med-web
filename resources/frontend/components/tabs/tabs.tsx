import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import s from "./tabs.module.scss";
import { ITabs } from "../../types/admin";


interface IProps {
    tabs: Array<ITabs>,
    handlerChangeTabs: (id: number) => void,
}


const Tabs: FC<IProps> = ({ tabs, handlerChangeTabs }) => {
    const { t } = useTranslation();
    return (
        <div className={s.table_upper_tab}>
            {
                tabs.length >= 0 && tabs.map(tab => (
                    <div
                        className={`${s.table_upper_tab_item} ${tab.selected ? s.selected : ""}`}
                        key={tab.id}
                        onClick={() => handlerChangeTabs(tab.id)}
                    >
                        {tab.count >= 0 && <span className={s.bage_count}>{tab.count}</span>}
                        <span className={s.tab_text}>{t(tab.name)}</span>
                    </div>
                ))
            }

        </div>
    );
};

// @ts-ignore
export default Tabs;
