import React from 'react'
import s from '../crud-table.module.scss'


interface ITableData {
    data?: any
    rowspan?: number
    colspan?: number
    className?: string
    handlerGetItemData?: (id: number) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        handlerGetItemData,
        data
    }
) => {

    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={(event) => handlerGetItemData(data)}
        >

            {children}
        </td>
    )
}


export default TableData
