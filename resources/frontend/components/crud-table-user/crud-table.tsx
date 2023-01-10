import React, {useState} from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import {IClientsData, ITitle} from '../../types/home-types';
import {ICount} from '../../types/admin';
import {IOption} from '../select/select';


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
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC")
    const [filteredData, setFilteredData] = useState<any[]>(null)
    const [titleName, setTitleName] = useState<string>("")

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

    return (
        <>
            <table className={s.table}>
                <TableHead titles={titles} titleSort={titleSort} filterTable={filterTable} titleName={titleName}/>
                <TableBody
                    data={filteredData ? filteredData : data}
                    titles={titles}
                    handlerGetClientData={handlerGetClientData}
                    HandlerGetProducts={HandlerGetProducts}
                    selectedIds={selectedIds}
                />

            </table>

            {/* {
                paginated && <TableFoot
                    count={count}
                    last_page={last_page}
                    activeItem={activeItem}
                    handlerChangeItem={HandlerPagination}
                />

            } */}


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

}

export default CrudTable
