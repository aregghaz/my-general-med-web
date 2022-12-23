import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import OrdersIcon from '-!svg-react-loader!../../../images/my-orders.svg'
import s from '../crud-table.module.scss'
import {useSelector} from "react-redux";

interface ITableBody {
    data: Array<any>
    isEdit?: boolean
    isDelete?: boolean
    isGetItems?: boolean
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    HandlerGetProducts?: (id: number) => void
    handlerGetclientData: (data: any) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isGetItems,
        handlerDeleteItem,
        handlerGetclientData,
        handlerEditItem,
        HandlerGetProducts
    }) => {


    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item)
                    return (
                        <TableRow key={index}>
                            {
                                keys.length> 0 &&
                                      (
                                        keys
                                            .map((key) => {
                                                    return (
                                                        <TableData data={item.id} key={key}
                                                                   handlerGetclientData={handlerGetclientData}>
                                                            {item[key]}
                                                        </TableData>
                                                    )
                                                }
                                            )
                                    )
                            }

                            {
                                (isEdit || isDelete) &&
                                <TableData>
                                    <div className={s.iconsWrapper}>

                                        {isEdit &&
                                            <EditIcon className={s.editIcon} onClick={() => handlerEditItem(item.id)}/>}

                                        {isDelete &&
                                            <TrashIcon className={s.trashIcon}
                                                       onClick={() => handlerDeleteItem(item.id)}/>}
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
