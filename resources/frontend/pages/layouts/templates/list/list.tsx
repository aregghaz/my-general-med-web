import React from 'react'
import Button from '../../../../components/button/button'
import CrudTable from '../../../../components/crud-table/crud-table'

import s from './list.module.scss'

interface IList {
    data: Array<any>
    titles: Array<string>
    isEdit?: boolean
    isDelete?: boolean
    isCreate?: boolean
    isGetItems?: boolean
    handlerAddItem?: () => void
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    HandlerPagination?: (id: number) => void
    HandlerGetProducts?: (id: number) => void
    paginated: boolean
    activeItem?: number
    ////FIXMECHANGE IT NORMA TYPR
    ///count?: {from:number,to:number}
    count?: any
    className?: string
}

const List: React.FC<IList> = (
    {
        isDelete = false,
        isEdit = false,
        isGetItems = false,
        data,
        titles,
        isCreate = false,
        handlerAddItem,
        handlerDeleteItem,
        handlerEditItem,
        HandlerPagination,
        HandlerGetProducts,
        activeItem,
        count,
        className,
        paginated
    }) => {
    return (
        <>
            <div className={s.addBtnWrapper}>
                {
                    isCreate &&
                    <Button type='green' className={s.add} onClick={handlerAddItem}>
                        <span>+</span>
                    </Button>
                }
            </div>

            <CrudTable
                titles={titles}
                data={data}
                isEdit={isEdit}
                isDelete={isDelete}
                isGetItems={isGetItems}
                handlerEditItem={handlerEditItem}
                handlerDeleteItem={handlerDeleteItem}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetProducts}
                activeItem={activeItem}
                count={count}
                className={className}
                paginated={paginated}
            />
        </>
    )
}


export default List
