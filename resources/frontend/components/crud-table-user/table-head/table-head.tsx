import React from 'react'
import TableRow from '../table-row/table-row'

import s from '../crud-table.module.scss'
import {useTranslation} from 'react-i18next'
import {ITitle} from '../../../types/home-types'
import {IOption} from '../../select/select'


import ArrowDown from '-!svg-react-loader!../../../svgs/arrow-down.svg'

interface ITableHead {
    titles: Array<IOption>
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
    const classes = (name: string) => filterTable === "ASC" && name === titleName ? s.rotate_arrow : " "
    const isNotActions = (title: string) => {
        if (title === "action" || title === "fields") {
            return null
        } else {
            return <ArrowDown
                className={classes(title)}
            />
        }
    }

    return (
        <thead className={s.tableHead}>
        <TableRow>
            {
                titles && titles
                    .map((title, index) => (
                            <th
                                // @ts-ignore
                                onClick={() => titleSort(title?.label)}
                                className={` ${s.tableTd} ${s.tableTh}`}
                                key={index}
                                colSpan={colspan || 1}
                                rowSpan={rowspan || 1}
                                style={{cursor: "pointer"}}
                            >
                                {t(title?.label)}
                                {
                                    isNotActions(title?.label)
                                }
                            </th>
                        )
                    )
            }
        </TableRow>
        </thead>
    )
}


export default TableHead
