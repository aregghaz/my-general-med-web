import React from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import { IClientsData, ITitle } from '../../types/home-types';
import { ICount } from '../../types/admin';


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        HandlerGetProducts,
        count,
        activeItem,
        last_page,
        className,
        HandlerPagination,
        handlerGetclientData,
        paginated
    }) => {

    return (
        <>
         {
                paginated && <TableFoot
                    count={count}
                    last_page={last_page}
                    activeItem={activeItem}
                    handlerChangeItem={HandlerPagination}
                />

            }
            <table className={s.table}>
                <TableHead titles={titles}/>
                <TableBody
                    data={data}
                    handlerGetclientData={handlerGetclientData}
                    HandlerGetProducts={HandlerGetProducts}
                />
            </table>
            {
                paginated && <TableFoot
                    count={count}
                    last_page={last_page}
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
    titles:Array<string>
    paginated?: boolean
    count: ICount
    last_page:number
    activeItem?: number
    className: string
    handlerGetclientData?: (data:IClientsData)=>void
    HandlerGetProducts?: (id: number) => void
    HandlerPagination?: (id: number) => void
}

export default CrudTable
