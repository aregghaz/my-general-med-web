import React from 'react'
import {IClientsData} from '../../../types/home-types'
import s from '../crud-table.module.scss'


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string,
    item: any,
    handlerGetclientData: (data: IClientsData) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        item,
        handlerGetclientData
    }
) => {

    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={() => handlerGetclientData(item)}
        >
            {children}
        </td>
    )
}


export default TableData
