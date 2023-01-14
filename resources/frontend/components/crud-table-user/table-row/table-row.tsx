import React from 'react'

import s from '../crud-table.module.scss'

interface ITableRow {
    className?: string
    onClick?: any
}

const TableRow: React.FC<ITableRow> = (
    {
        className,
        children
    }) => {
    return (
        <tr className={`${s.row}  ${className ? className : ''}`}>
            {children}
        </tr>
    )
}


export default TableRow
