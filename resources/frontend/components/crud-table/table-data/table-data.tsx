import React from 'react'
import s from '../crud-table.module.scss'


interface ITableData {
    data?: any
    rowspan?: number
    colspan?: number
    className?: string
    handlerGetClientData?: (data: any) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        handlerGetClientData,
        data
    }
) => {

    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={() => handlerGetClientData(data)}
        >
            {children}
        </td>
    )
}


export default TableData
