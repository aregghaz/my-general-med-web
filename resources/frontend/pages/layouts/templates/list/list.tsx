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
    handlerAddItem?: () => void
    handlerEditItem?: (id:number) => void
    handlerDeleteItem?: (id:number) => void
}

const List: React.FC<IList> = (
    {
        isDelete = false,
        isEdit = false,
        data,
        titles,
        isCreate = false,
        handlerAddItem,
        handlerDeleteItem,
        handlerEditItem
    }) => {


    return (
        <>
            <div className={s.addBtnWrapper}>
                {
                    isCreate &&
                    <Button type='green' className={s.add} onClick={handlerAddItem}  >
                        <span>+</span>
                    </Button>
                }
            </div>

            <CrudTable
                titles={titles}
                data={data}
                isEdit={isEdit}
                isDelete={isDelete}
                handlerEditItem={handlerEditItem}
                handlerDeleteItem={handlerDeleteItem}
            />
        </>

    )
}


export default List
