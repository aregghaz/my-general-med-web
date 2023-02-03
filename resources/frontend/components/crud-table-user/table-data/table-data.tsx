import React from 'react'
import {IClientsData} from '../../../types/home-types'
import s from '../crud-table.module.scss'


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string,
    field?: string,
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
        field,
       handlerGetClientData
    }
) => {
    return (
        <td
            className={((field=== 'origin' || field === 'destination') ? `${s.tableTd} ${s.address}`: `${s.tableTd}` )}
            colSpan={colspan||1}

            rowSpan={rowspan || 1}
            onClick={(event) => handlerGetClientData(event, item['id'])}
        >
            {children}
        </td>
    )
}


export default TableData
