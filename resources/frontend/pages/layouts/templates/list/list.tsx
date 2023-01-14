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
    handlerGetVendorUsers?: (id: any) => void
    paginated: boolean
    activeItem?: number
    ////FIXMECHANGE IT NORMA TYPR
    last_page?: number
    handlerChangeTabs?: (id: number,name:string) => void
    count?: any
    className?: string
    tabId?:number
    tabs?:Array<{id:number, name:string, count:number,slug?:string}>
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
        handlerGetVendorUsers,
        last_page,
        activeItem,
        tabId,
        handlerChangeTabs,
        count,
        tabs,
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
            <div className={s.table_upper_tab_box}>
                <div className={s.table_upper_tab}>
                    {

                        tabs && tabs.length>0 && tabs.map(tab => (
                            <div
                            className={s.table_upper_tab_item}
                            key={tab.id}
                            // style={tabId == tab.id ? {
                            //     backgroundColor: '#165f8d',
                            //     color: "white"
                            // } : {backgroundColor: 'white'}}
                            onClick={() => handlerChangeTabs(tab.id,tab.name)}
                            >
                                {tab.name} {tab.count >=0 && <span className={s.bage_count}>{tab.count}</span>}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={s.table_wrapper}>
                <CrudTable
                    titles={titles}
                    data={data}
                    isEdit={isEdit}
                    last_page={last_page}
                    isDelete={isDelete}
                    isGetItems={isGetItems}
                    handlerEditItem={handlerEditItem}
                    handlerDeleteItem={handlerDeleteItem}
                    HandlerPagination={HandlerPagination}
                    HandlerGetProducts={HandlerGetProducts}
                    handlerGetVendorUsers={handlerGetVendorUsers}
                    activeItem={activeItem}
                    count={count}
                    className={className}
                    paginated={paginated}
                />
            </div>
        </>
    )
}


export default List
