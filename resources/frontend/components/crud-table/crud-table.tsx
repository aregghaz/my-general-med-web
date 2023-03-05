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
        isGetInfo,
        isGetItems,
        isGetHistory,
        handlerAction,
        tableRef,
        className,
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC")
    const [filteredData, setFilteredData] = useState<any[]>(null)
    const [titleName, setTitleName] = useState<string>("")


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

            <table className={s.table} ref={tableRef}>
                <TableHead titles={titles} titleSort={titleSort} filterTable={filterTable} titleName={titleName}/>
                <TableBody
                    data={filteredData ? filteredData : data}
                    isDelete={isDelete}
                    isEdit={isEdit}
                    isGetInfo={isGetInfo}
                    isGetHistory={isGetHistory}
                    handlerAction={handlerAction}
                    isGetItems={isGetItems}

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
    isGetInfo: boolean
    isGetHistory: boolean
    isGetItems?: boolean
    className: string
    handlerAction: (action:string,id: number) => void
    tableRef:any
}

export default CrudTable
