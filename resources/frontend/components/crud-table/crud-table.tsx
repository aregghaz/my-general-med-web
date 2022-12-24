import React from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import {ICount} from '../../types/admin';
import {useSelector} from "react-redux";


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        isDelete,
        isEdit,
        isGetItems,
        handlerEditItem,
        handlerDeleteItem,
        HandlerGetProducts,
        handlerGetclientData,
        count,
        last_page,
        activeItem,
        className,
        HandlerPagination,
        paginated
    }) => {

    return (
        <>
            <table className={s.table}>
                {/*@ts-ignore*/}
                <TableHead titles={titles}/>
                <TableBody
                    data={data}
                    isDelete={isDelete}
                    isEdit={isEdit}
                    isGetItems={isGetItems}
                    handlerDeleteItem={handlerDeleteItem}
                    handlerGetclientData={handlerGetclientData}
                    handlerEditItem={handlerEditItem}
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
    titles: Array<string>
    isEdit?: boolean
    isDelete?: boolean
    paginated?: boolean
    isGetItems?: boolean
    count?: ICount
    activeItem?: number
    last_page: number
    className: string
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    HandlerPagination?: (id: number) => void
    HandlerGetProducts?: (id: number) => void
    handlerGetclientData: (data: any) => void
}

export default CrudTable
