import React from 'react'
import TableRow from '../table-row/table-row'

import s from '../crud-table.module.scss'
import {useTranslation} from 'react-i18next'
import ArrowDown from '-!svg-react-loader!../../../svgs/arrow-down.svg'
import {useSelector} from "react-redux";

interface ITableHead {
    titles: Array<string>
    colspan?: number
    rowspan?: number
    titleSort: (name: string) => void,
    filterTable: string
    titleName: string
}

const TableHead: React.FC<ITableHead> = (
    {
        titles,
        colspan = 1,
        rowspan = 1,
        titleSort,
        filterTable,
        titleName,
    }) => {
    const {t} = useTranslation()
    //@ts-ignore
    return (
        <thead className={s.tableHead}>
        <TableRow>
            {
                titles
                    .map((title, index) => {
                            return index !== 0 && (
                                <th
                                    onClick={() => titleSort(title)}
                                    className={` ${s.tableTd} ${s.tableTh}`}
                                    key={index}
                                    colSpan={colspan || 1}
                                    rowSpan={rowspan || 1}
                                    style={{cursor: "pointer"}}
                                >
                                    {t(title)}
                                    {
                                        filterTable === "ASC" && title === titleName
                                            ? <span> <ArrowDown style={{transform: "rotate(180deg)"}}/></span>
                                            : <span> <ArrowDown/></span>
                                    }
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
