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
    titles: Array<IOption>,
    isEdit?: boolean
    isDelete?: boolean
    isGetItems?: boolean
    HandlerGetProducts?: (id: number) => void
    handlerGetClientData?: (event: any, data: number) => void,
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    handlerGetItemData?: (id: number) => void
    selectedIds: number[]

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        titles,
        isEdit,
        isDelete,
        isGetItems,
        handlerGetClientData,
        handlerDeleteItem,
        ///handlerGetVendorUsers,
        handlerEditItem,
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
                                  className={selectedIds?.includes(item['id']) ? `${s.chosen}` : ""}>
                            {
                                keys.map((key: any, i: number) => {
                                        return i !== 0 && (
                                            <TableData key={key} item={item}
                                                       handlerGetClientData={handlerGetClientData}>
                                                {item[key]}
                                            </TableData>
                                        )
                                    }
                                )
                            }
                            {
                                (isEdit || isDelete ) &&
                                <TableData  item={99999} key={999999}>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isEdit &&
                                            <EditIcon
                                                className={s.editIcon}
                                                onClick={() => handlerEditItem(item.id)}
                                            />
                                        }
                                        {
                                            isDelete &&
                                            <TrashIcon
                                                className={s.trashIcon}
                                                onClick={() => handlerDeleteItem(item.id)}
                                            />
                                        }
                                    </div>
                                </TableData>
                            }
                        </TableRow>
                    )
                })
        }
        </tbody>
    )
}


export default TableBody
