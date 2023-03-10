import React, {ChangeEvent} from 'react'

import s from './navigationTab.module.scss'
import Tabs from "../tabs/tabs";
import { DownloadTableExcel } from "react-export-table-to-excel";
import BackDropSearch from "../backdrop-search/backdrop-search";
import tabs from "../tabs/tabs";
import { ITabs } from "../../types/admin";
import Upload from "-!svg-react-loader!../../images/Upload.svg";
import Import from "-!svg-react-loader!../../images/Import.svg";
import Filters from "-!svg-react-loader!../../images/filters.svg";
import Search from "-!svg-react-loader!../../images/Search.svg";
import Close from "-!svg-react-loader!../../images/Close.svg";
import AssignVendorIcon from "-!svg-react-loader!../../images/add-company-icon.svg";
import AssignIcon from "-!svg-react-loader!../../images/car-travel-plus-add-svgrepo-com.svg";
import ClaimTrip from "-!svg-react-loader!../../images/briefcase-work-business-add-svgrepo-com.svg";
import RemoveIcon from "-!svg-react-loader!../../images/briefcase-work-business-delete-svgrepo-com.svg";
import DataPicker from "../data-picker/data-picker";


interface INavigationTab {
    tabs: Array<ITabs>,
    handlerChangeTabs: (id: number) => void,
    handleActionMiddleware?: (id?: number, action?:string) => void,
    setfiltre?: (filtre: boolean) => void,
    onSearchInput: ( event: { search: string }) => void,
    setFieldValue?: (name: string, date: string) => void,
    openSearch: () => void,
    fileUploader: (file: React.ChangeEvent<HTMLInputElement>) => void,
    filtre?:boolean,
    isAssignVednor?:boolean,
    IsDateSearch?:boolean,
    isClaimTrip?:boolean,
    isReRoute?:boolean,
    IsAssignCar?:boolean,
    isShowFiltre?:boolean,
    date?:string,
    open:boolean,
    tableRef:any,
    typeId:number,
    ids?:Array<number>,
}
const NavigationTab: React.FC<INavigationTab> = (
    {
        tabs,
        handlerChangeTabs,
        handleActionMiddleware,
        ids,
        openSearch,
        isAssignVednor=false,
        isClaimTrip=false,
        isReRoute=false,
        IsAssignCar=false,
        IsDateSearch=false,
        isShowFiltre=false,
        filtre,
        typeId,
        setFieldValue,
        fileUploader,
        tableRef,
        date,
        onSearchInput,
        setfiltre,
        open
    }) => {
    // console.log(value)
    const showFilter = () => {
        setfiltre(!filtre);
    };
    console.log(typeId,'');
    return (
        <>
            <Tabs tabs={tabs}
                  handlerChangeTabs={handlerChangeTabs} />
            <div style={{ display: "flex", gap: "10px" }}>
                {isAssignVednor && <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        Assign Vendor
                    </div>
                    <AssignVendorIcon
                        className={`${s.icon}  ${ typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware()}
                    />
                </div>}
                {isClaimTrip && <div className={s.import_block}>
                    <ClaimTrip
                        className={`${s.icon} ${typeId === 1 || typeId === 4 || typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware(1, "default")}
                    />
                </div>}
                {isReRoute && <div className={s.import_block}>
                    <RemoveIcon
                        className={`${s.icon} ${typeId === 2 || typeId === 4 || typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware(4, "reRoute")}
                    />
                </div>}
                {IsAssignCar && <div className={s.import_block}>
                    <AssignIcon
                        className={`${s.icon} ${typeId === 2 || typeId === 4 || typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware(99, "assign")}
                    />
                </div>}
                {isShowFiltre && <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        Filters
                    </div>
                    <Filters height="24px" onClick={showFilter} />
                </div>}
                <div className={s.upload_block}>
                    <div className={s.iconAbbr}>
                        Upload
                    </div>
                    <label htmlFor="uploadFile">
                        <Upload />
                    </label>
                    <input
                        id="uploadFile"
                        type="file"
                        onChange={fileUploader}
                        style={{ display: "none" }}
                        accept=".xls, .xlsx, .csv"
                    />
                </div>
                <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        Download Excel
                    </div>
                    <label htmlFor="downloadTableExcel">
                        <DownloadTableExcel
                            filename="users table"
                            sheet="users"
                            currentTableRef={tableRef.current}
                        >
                            <Import />
                        </DownloadTableExcel>
                    </label>
                </div>
                <div className={s.import_block} onClick={() => {
                    openSearch();
                }}>
                    <div className={s.iconAbbr}>
                        {open ? "Close" : "Search"}
                    </div>
                    {open ? <Close /> : <Search />}
                </div>
            </div>
            <div
                className={`${s.header_input_block} ${open ? s.active : s.passive}`}
            >
                {IsDateSearch && <div>
                    <DataPicker name={"date"} selectRange={false} setFieldValue={setFieldValue}
                                value={date} />

                </div>}
            <div style={{width:"100%"}}>
                <BackDropSearch handlerSubmit={onSearchInput} />
            </div>

            </div>

        </>
    )
}

export default NavigationTab