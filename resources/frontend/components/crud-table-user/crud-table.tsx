import React, {useRef, useState} from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import {ICount} from '../../types/admin';
import {IOption} from '../select/select';
import {DownloadTableExcel} from 'react-export-table-to-excel';


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        HandlerGetProducts,
        className,
        HandlerPagination,
        handlerGetClientData,
        paginated,
        selectedIds,
        typeId,
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC")
    const [filteredData, setFilteredData] = useState<any[]>(null)
    const [titleName, setTitleName] = useState<string>("")
    const [defaultTypeId, _] = useState<number>(1)
    const tableRef = useRef(null);

    const titleSort = (name: string) => {
        if (filterTable === "ASC") {
            setFilteredData(data.sort((a, b) => a[name].toLowerCase() > b[name].toLowerCase() ? 1 : -1))
            setFilterTable("DSC")
        }
        if (filterTable === "DSC") {
            setFilteredData(data.sort((a, b) => a[name].toLowerCase() < b[name].toLowerCase() ? 1 : -1))
            setFilterTable("ASC")
        }
        setTitleName(name)
    }
    const whichData = filteredData ? filteredData : data;
    const resetOrNotTable = defaultTypeId !== typeId ? data : whichData

    return (
        <>
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <button className={s.download_btn}> Export excel</button>
            </DownloadTableExcel>

            <table className={s.table} ref={tableRef}>
                <TableHead titles={titles} titleSort={titleSort} filterTable={filterTable} titleName={titleName}/>
                <TableBody
                    data={resetOrNotTable}
                    titles={titles}
                    handlerGetClientData={handlerGetClientData}
                    HandlerGetProducts={HandlerGetProducts}
                    selectedIds={selectedIds}
                />

            </table>
        </>
    )
}

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles: Array<IOption>
    paginated?: boolean
    count?: ICount
    className: string
    handlerGetClientData?: (event: any, data: number) => void
    HandlerGetProducts?: (id: number) => void
    HandlerPagination?: (event: any, id: number) => void
    selectedIds: number[]
    typeId: number

}

export default CrudTable
