import React from "react";
import Button from "../../../../components/button/button";
import CrudTable from "../../../../components/crud-table/crud-table";

import s from "./list.module.scss";
import { useTranslation } from "react-i18next";

interface IList {
    data: Array<any>;
    titles: Array<string>;
    isEdit: boolean;
    isDelete: boolean;
    isGetHistory: boolean;
    isCreate: boolean;
    isGetItems: boolean;
    isGetInfo: boolean;
    paginated: boolean;
    activeItem?: number;
    ////FIXMECHANGE IT NORMA TYPR
    last_page?: number;
    handlerAction?: (action:string,id: number) => void;
    className?: string;
}


const List: React.FC<IList> = (
    {
        isDelete = false,
        isEdit = false,
        isGetItems = false,
        data,
        titles,
        isCreate = false,
        isGetInfo = false,
        isGetHistory=false,
        handlerAction,
        className,
        paginated
    }) => {

    const { t } = useTranslation();
    return (
        <>
            <div className={s.addBtnWrapper}>
                {
                    isCreate &&
                    <Button type="green" className={s.add} onClick={() => handlerAction( 'add', 0)}>
                        <span>+</span>
                    </Button>
                }
            </div>
            <div className={s.table_wrapper}>
                <CrudTable
                    titles={titles}
                    data={data}
                    isEdit={isEdit}
                    isDelete={isDelete}
                    isGetInfo={isGetInfo}
                    isGetItems={isGetItems}
                    handlerAction={handlerAction}
                    className={className}
                    isGetHistory={isGetHistory}
                />
            </div>
        </>
    );
};


export default List;
