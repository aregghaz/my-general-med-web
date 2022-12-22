import React from 'react'
import TableRow from '../table-row/table-row'

import s from '../crud-table.module.scss'
import {useTranslation} from 'react-i18next'
import {ITitle} from '../../../types/home-types'
import { IOption } from '../../select/select'

interface ITableHead {
    titles: Array<IOption>
    colspan?: number
    rowspan?: number
}

const TableHead: React.FC<ITableHead> = (
    {
        titles,
        colspan = 1,
        rowspan = 1
    }) => {
    const {t} = useTranslation()
    console.log(titles,'1111111111111111111111111111111111111');
    
    return (
        <thead className={s.tableHead}>
        <TableRow>
            {
               titles && titles
                    .map((title, index) => (
                            <th
                                className={` ${s.tableTd} ${s.tableTh}`}
                                key={index}
                                colSpan={colspan || 1}
                                rowSpan={rowspan || 1}
                            >
                                {t(title.label)}
                            </th>
                        )
                    )
            }
        </TableRow>
        </thead>
    )
}


export default TableHead
