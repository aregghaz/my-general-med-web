import React, {useState} from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import {ICount} from '../../types/admin';
import {IOption} from '../select/select';
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Import from '-!svg-react-loader!../../images/Import.svg'

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
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className={s.download_btn}
                table="download_table"
                filename="table data"
                sheet="table data"
                buttonText="Download table to Excel file"
            />

            <table className={s.table} id="download_table">
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
