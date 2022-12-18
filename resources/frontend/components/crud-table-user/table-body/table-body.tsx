import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import OrdersIcon from '-!svg-react-loader!../../../images/my-orders.svg'
import s from '../crud-table.module.scss'

interface ITableBody {
    data: Array<any>
    HandlerGetProducts?: (id: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
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
                            {keys
                                .map((key) => {
                                        if (key === 'image') {
                                            return (
                                                <TableData key={key}>
                                                    <img
                                                        src={item[key] ? item[key] : '/uploads/partners/avatar.png' }
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
                                
                                <TableData>
                                    <div className={s.iconsWrapper}>
                                        <OrdersIcon className={s.editIcon} onClick={() => HandlerGetProducts(item.id)}/>

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