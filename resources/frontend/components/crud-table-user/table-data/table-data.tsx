import React from "react";
import s from "../crud-table.module.scss";


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string,
    click?: boolean,
    item: any,
    handlerAction?: (id: number, action: string) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        item,
        click,
        handlerAction
    }
) => {
    return (
        <td
            className={`${s.classNameField} ${className}`}
            colSpan={colspan || 1}

            rowSpan={rowspan || 1}
            onClick={(event) =>  !click ? click : handlerAction(item["id"], "get")}
        >
            <div className={(className === "origin_comment" || className === "destination_comments") ? s.addressWrapper : undefined}>
                {children}
            </div>
        </td>
    );
};


export default TableData;
