import React from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'

import s from './crud-table.module.scss'


interface ICrudTable {
    data: Array<any>
    titles: Array<string>
    isEdit?: boolean
    isDelete?: boolean
    handlerEditItem?: (id:number) => void
    handlerDeleteItem?: (id:number) => void
}

const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        isDelete,
        isEdit,
        handlerEditItem,
        handlerDeleteItem
    }) => {

    return (
        <table className={s.table}>
            <TableHead titles={titles}/>
            <TableBody
                data={data}
                isDelete={isDelete}
                isEdit={isEdit}
                handlerDeleteItem={handlerDeleteItem}
                handlerEditItem={handlerEditItem}
            />
        </table>
    )
}

export default CrudTable
