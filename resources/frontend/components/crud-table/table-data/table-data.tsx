import React from 'react'
import s from '../crud-table.module.scss'


interface ITableData {
    data?: any
    rowspan?: number
    colspan?: number
    className?: string,
    isGetInfo:boolean,
    handlerAction?: (action:string,id: number) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        isGetInfo,
        children,
        handlerAction,
        data
    }
) => {


    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={(event) => isGetInfo && handlerAction('get',data)}
        >

            {children}
        </td>
    )
}


export default TableData
