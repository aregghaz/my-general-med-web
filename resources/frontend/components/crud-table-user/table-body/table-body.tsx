import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import OrdersIcon from '-!svg-react-loader!../../../images/my-orders.svg'
import s from '../crud-table.module.scss'
import {IClientsData} from '../../../types/home-types'
import {IOption} from '../../select/select'

interface ITableBody {
    data: Array<any>
    titles: Array<IOption>
    HandlerGetProducts?: (id: number) => void
    handlerGetClientData?: (event: any, data: number) => void,
    selectedIds: number[]

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        titles,
        handlerGetClientData,
        selectedIds,
    }) => {

    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item)
                    return keys.length > 0 && (
                        <TableRow key={index} data-rowid={item['id']}
                                  className={selectedIds.includes(item['id']) ? `${s.chosen}` : `${s.unChosen}`}>
                            {
                                keys.map((key: any, i: number) => {
                                        return i !== 0 && (
                                            <TableData key={key} item={item}
                                                       handlerGetClientData={() => handlerGetClientData(event, item['id'])}>
                                                {item[key]}
                                            </TableData>
                                        )
                                    }
                                )
                            }
                        </TableRow>
                    )
                })
        }
        </tbody>
    )
}


export default TableBody
