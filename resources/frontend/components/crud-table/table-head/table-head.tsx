import React from 'react'
import TableRow from '../table-row/table-row'

import s from '../crud-table.module.scss'
import {useTranslation} from 'react-i18next'
import {useSelector} from "react-redux";

interface ITableHead {
    titles: Array<string>
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
    //@ts-ignore
    return (
        <thead className={s.tableHead}>
        <TableRow>
            {
                titles
                    .map((title, index) => {
                            return  index!== 0 &&(
                                <th
                                    className={` ${s.tableTd} ${s.tableTh}`}
                                    key={index}
                                    colSpan={colspan || 1}
                                    rowSpan={rowspan || 1}
                                >
                                    {t(title)}
                                </th>
                            )
                        }
                    )
            }
        </TableRow>
        </thead>
    )
}


export default TableHead
