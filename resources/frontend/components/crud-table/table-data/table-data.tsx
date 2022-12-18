import React from 'react'
import s from '../crud-table.module.scss'


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string
    handlerGetclientData: (data: any) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        handlerGetclientData
    }
) => {
    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={handlerGetclientData}
        >
            {children}
        </td>
    )
}


export default TableData