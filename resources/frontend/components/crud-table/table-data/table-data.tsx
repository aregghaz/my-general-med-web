import React from 'react'
import s from '../crud-table.module.scss'


interface ITableData {
    data?: any
    rowspan?: number
    colspan?: number
    className?: string
    handlerGetclientData?: (data: any) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        handlerGetclientData,
        data
    }
) => {
    console.log(children,'222');
    
    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={() => handlerGetclientData(data)}
        >
            {children}
        </td>
    )
}


export default TableData
