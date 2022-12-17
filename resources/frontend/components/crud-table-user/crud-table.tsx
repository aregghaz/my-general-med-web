import React from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import { ITitle } from '../../types/home-types';


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        HandlerGetProducts,
        count,
        activeItem,
        className,
        HandlerPagination,
        paginated
    }) => {

    return (
        <>
            <table className={s.table}>
                <TableHead titles={titles}/>
                <TableBody
                    data={data}
                    HandlerGetProducts={HandlerGetProducts}
                />
            </table>
            {
                paginated && <TableFoot
                    count={count}
                    activeItem={activeItem}
                    handlerChangeItem={HandlerPagination}
                />

            }


        </>
    )
}

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles:Array<ITitle>
    paginated?: boolean
    count: number
    activeItem?: number
    className: string
    HandlerGetProducts?: (id: number) => void 
    HandlerPagination?: (id: number) => void 
}

export default CrudTable
