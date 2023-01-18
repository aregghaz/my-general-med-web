import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import UsersIcon from '-!svg-react-loader!../../../images/Users.svg'
import s from '../crud-table.module.scss'

interface ITableBody {
    data: Array<any>
    isEdit?: boolean
    isDelete?: boolean
    isGetItems?: boolean
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    handlerGetItemData?: (id: number) => void
    handlerGetVendorUsers?: (id: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isGetItems,
        handlerDeleteItem,
        handlerGetVendorUsers,
        handlerEditItem,
        handlerGetItemData
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
                                keys.length > 0 &&
                                (
                                    keys
                                        .map((key, i) => {

                                                if (key == 'fields') {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
                                                                   handlerGetItemData={handlerGetItemData}
                                                        >
                                                            {item[key].map((e: string, ind: number) => {
                                                                return <span key={ind} className={s.label_span}>{e}</span>
                                                            })}
                                                        </TableData>
                                                    )
                                                } else if (key == 'image') {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
                                                                   handlerGetItemData={handlerGetItemData}
                                                        >
                                                            <img src={item[key]} alt="" />
                                                        </TableData>
                                                    )
                                                } else {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
                                                                   handlerGetItemData={handlerGetItemData}
                                                        >
                                                            {item[key]}
                                                        </TableData>
                                                    )
                                                }

                                            }
                                        )
                                )
                            }

                            {
                                (isEdit || isDelete || isGetItems) &&
                                <TableData>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isEdit &&
                                            <EditIcon
                                                className={s.editIcon}
                                                onClick={() => handlerEditItem(item.id)}
                                            />
                                        }
                                        {
                                            isGetItems &&
                                            <UsersIcon
                                                className={s.editIcon}
                                                onClick={() => handlerGetVendorUsers(item.id)}
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
