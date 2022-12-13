import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'

import s from '../crud-table.module.scss'

interface ITableBody {
    data: Array<any>
    isEdit?: boolean
    isDelete?: boolean
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        handlerDeleteItem,
        handlerEditItem
    }) => {

    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item)
                    return (
                        <TableRow key={index}>
                            {keys
                                .map((key) => {
                                        if (key === 'image') {
                                            return (
                                                <TableData key={key}>
                                                    <img
                                                        src={item[key]}
                                                        alt={key}
                                                        className={s.img}
                                                    />
                                                </TableData>
                                            )
                                        }

                                        return (
                                            <TableData key={key}>
                                                {item[key]}
                                            </TableData>
                                        )
                                    }
                                )
                            }

                            {
                                (isEdit || isDelete) &&
                                <TableData>
                                    <div className={s.iconsWrapper}>
                                        {isEdit &&
                                        <EditIcon className={s.editIcon} onClick={() => handlerEditItem(item.id)}/>}
                                        {isDelete &&
                                        <TrashIcon className={s.trashIcon} onClick={()=> handlerDeleteItem(item.id)}/>}
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
