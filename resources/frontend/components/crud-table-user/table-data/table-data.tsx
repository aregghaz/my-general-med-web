import React from 'react'
import {IClientsData} from '../../../types/home-types'
import s from '../crud-table.module.scss'


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string,
    item: any,
    handlerGetClientData?: (event:any,id: number) => void
    handlerOnClick?: (event: any) => void
}

const TableData: React.FC<ITableData> = (
    {
        handlerOnClick,
        rowspan = 1,
        colspan = 1,
        className,
        children,
        item,
       handlerGetClientData
    }
) => {

    return (
        <td
            className={`${s.tableTd} ${className ? className : ''}`}
            colSpan={colspan || 1}
            rowSpan={rowspan || 1}
            onClick={(event) => handlerGetClientData(event, item['id'])}
        >
            {children}
        </td>
    )
}


export default TableData
