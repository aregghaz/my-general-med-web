import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import InfoIcon from '-!svg-react-loader!../../../images/paper.svg'
import AssignIcon from '-!svg-react-loader!../../../images/add-car-icon.svg'
import OrdersIcon from '-!svg-react-loader!../../../images/my-orders.svg'
import s from '../crud-table.module.scss'
import {IClientsData} from '../../../types/home-types'
import {IOption} from '../../select/select'

interface ITableBody {
    data: Array<any>
    isEdit?: boolean
    isDelete?: boolean
    isInfo?: boolean,
    isAssign?: boolean,
    handlerAction: (id: number, action:string) => void
    selectedIds: number[]

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isAssign,
        isDelete,
        isInfo,
        handlerAction,
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
                                (isEdit || isDelete || isInfo  || isAssign) &&
                                <TableData  item={99999} key={999999}>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isEdit &&
                                            <EditIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction(item.id,'edit')}
                                            />
                                        }
                                        {
                                            isDelete &&
                                            <TrashIcon
                                                className={s.trashIcon}
                                                onClick={() => handlerAction(item.id, 'delete')}
                                            />
                                        }
                                        {
                                            isInfo &&
                                            <InfoIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction(item.id, 'info')}
                                            />
                                        }
                                        {
                                            isAssign &&
                                            <AssignIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction(item.id, 'assign')}
                                            />
                                        }
                                    </div>
                                </TableData>
                            }
                            {
                                keys.map((key: any, i: number) => {
                                        return i !== 0 && key !== 'car_name' && (
                                            <TableData key={key} item={item} className={key}
                                                       handlerAction={handlerAction}>
                                                {(key !== 'car_id' ?item[key] : item['car_id'] != null ? item['car_name'] : '')}
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
