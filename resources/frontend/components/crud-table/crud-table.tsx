import React, {useRef, useState} from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import {ICount} from '../../types/admin';
import {DownloadTableExcel} from "react-export-table-to-excel";


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        isDelete,
        isEdit,
        isGetItems,
        isGetHistory,
        handlerEditItem,
        handlerDeleteItem,
        handlerGetItemData,
        handlerGetVendorUsers,
        className,
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC")
    const [filteredData, setFilteredData] = useState<any[]>(null)
    const [titleName, setTitleName] = useState<string>("")
    const tableRef = useRef(null);

    const titleSort = (name: string) => {
        if (name !== "action") {
            if (filterTable === "ASC") {
                setFilteredData(data.sort((a, b) => a[name]?.toLowerCase() > b[name]?.toLowerCase() ? 1 : -1))
                setFilterTable("DSC")
            }
            if (filterTable === "DSC") {
                setFilteredData(data.sort((a, b) => a[name]?.toLowerCase() < b[name]?.toLowerCase() ? 1 : -1))
                setFilterTable("ASC")
            }
            setTitleName(name)
        }

    }
    return (
        <>
            {/*<DownloadTableExcel*/}
            {/*    filename="users table"*/}
            {/*    sheet="users"*/}
            {/*    currentTableRef={tableRef.current}*/}
            {/*>*/}
            {/*    <button className={s.download_btn}> Export excel</button>*/}
            {/*</DownloadTableExcel>*/}

            <table className={s.table} ref={tableRef}>
                <TableHead titles={titles} titleSort={titleSort} filterTable={filterTable} titleName={titleName}/>
                <TableBody
                    data={filteredData ? filteredData : data}
                    isDelete={isDelete}
                    isEdit={isEdit}
                    isGetHistory={isGetHistory}
                    handlerGetItemData={handlerGetItemData}
                    isGetItems={isGetItems}
                    handlerDeleteItem={handlerDeleteItem}
                    handlerGetVendorUsers={handlerGetVendorUsers}
                    handlerEditItem={handlerEditItem}
                />
            </table>
            {/*{*/}
            {/*    paginated && <TableFoot*/}
            {/*        count={count}*/}
            {/*        last_page={last_page}*/}
            {/*        activeItem={activeItem}*/}
            {/*        handlerChangeItem={HandlerPagination}*/}
            {/*    />*/}

            {/*}*/}
        </>
    )
}

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles: Array<string>
    isEdit: boolean
    isDelete: boolean
    isGetHistory: boolean
    paginated:boolean,
    isGetItems?: boolean
    count?: ICount
    activeItem?: number
    last_page: number
    className: string
    handlerEditItem?: (id: number) => void
    handlerDeleteItem?: (id: number) => void
    HandlerPagination?: (id: number) => void
    handlerGetItemData?: (id: number) => void
    handlerGetVendorUsers?: (id: number) => void
    /// handlerGetClientData: (data: any) => void
}

export default CrudTable
