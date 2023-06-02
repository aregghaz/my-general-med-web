import React, { useState } from "react";
import TableHead from "./table-head/table-head";
import TableBody from "./table-body/table-body";
import s from "./crud-table.module.scss";
import { IOption } from "../select/select";
import InfiniteScroll from "react-infinite-scroll-component";


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        isAssign,
        isEdit,
        isGetHistory,
        isDelete,
        isClaim,
        isRemove,
        isAssignVendor,
        isInfo,
        tableRef,
        fetchMoreData,
        handlerAction,
        action,
        selectedIds,
        typeId
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC");
    const [filteredData, setFilteredData] = useState<any[]>(null);
    const [titleName, setTitleName] = useState<string>("");
    const [defaultTypeId, _] = useState<number>(1);

    const titleSort = (name: string) => {
        if (name !== "action") {
            if (filterTable === "ASC") {
                setFilteredData(data.sort((a, b) => a[name]?.toLowerCase() > b[name]?.toLowerCase() ? 1 : -1));
                setFilterTable("DSC");
            }
            if (filterTable === "DSC") {
                setFilteredData(data.sort((a, b) => a[name]?.toLowerCase() < b[name]?.toLowerCase() ? 1 : -1));
                setFilterTable("ASC");
            }
            setTitleName(name);
        }
    };
    const whichData = filteredData ? filteredData : data;
    const resetOrNotTable = defaultTypeId !== typeId ? data : whichData;

    return (
        <>
            <InfiniteScroll
                dataLength={resetOrNotTable.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={resetOrNotTable.length > 0}
                loader={<h4>Loading...</h4>}
                height={700}
            >
                <table className={s.table} ref={tableRef}>
                    <TableHead action={action} titles={titles} titleSort={titleSort} filterTable={filterTable}
                               titleName={titleName} />

                    <TableBody
                        data={resetOrNotTable}
                        isEdit={isEdit}
                        isInfo={isInfo}
                        isAssign={isAssign}
                        isDelete={isDelete}
                        isGetHistory={isGetHistory}
                        isClaim={isClaim}
                        isRemove={isRemove}
                        typeId={typeId}
                        isAssignVendor={isAssignVendor}
                        handlerAction={handlerAction}
                        selectedIds={selectedIds}
                    />

                </table>
            </InfiniteScroll>
        </>
    );
};

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles: Array<IOption>
    isDelete: boolean
    isEdit: boolean
    isGetHistory: boolean
    isRemove: boolean
    isAssign: boolean
    isClaim: boolean
    isInfo: boolean
    action: boolean
    isAssignVendor: boolean
    className: string
    handlerAction: (id: number, action: string) => void
    fetchMoreData: () => void
    selectedIds: number[]
    typeId: number,
    tableRef: any

}

export default CrudTable;
