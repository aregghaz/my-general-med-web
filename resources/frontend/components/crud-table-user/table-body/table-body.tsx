import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import TrashIcon from "-!svg-react-loader!../../../images/trash.svg";
import EditIcon from "-!svg-react-loader!../../../images/edit.svg";
import InfoIcon from "-!svg-react-loader!../../../images/paper.svg";
import AssignIcon from "-!svg-react-loader!../../../images/car-travel-plus-add-svgrepo-com.svg";
import AssignVendorIcon from "-!svg-react-loader!../../../images/add-company-icon.svg";
import RemoveIcon from "-!svg-react-loader!../../../images/briefcase-work-business-delete-svgrepo-com.svg";
import s from "../crud-table.module.scss";
import ClaimTrip from "-!svg-react-loader!../../../images/briefcase-work-business-add-svgrepo-com.svg";
import ActivityIcon from "-!svg-react-loader!../../../images/Actions.svg";

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean
    isInfo: boolean,
    isClaim: boolean,
    isAssign: boolean,
    isGetHistory: boolean,
    isAssignVendor: boolean,
    isRemove: boolean,
    handlerAction: (id: number, action: string) => void
    selectedIds: number[]
    typeId: number

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isAssign,
        isDelete,
        isClaim,
        isGetHistory,
        isInfo,
        isRemove,
        isAssignVendor,
        handlerAction,
        selectedIds,
        typeId
    }) => {
    let count = 0;

    return (
        <tbody>

        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item);
                    return keys.length > 0 && (

                        <TableRow key={index} data-rowid={item["id"]}
                                  className={`${selectedIds?.includes(item["id"]) ? s.chosen : ""} ${++count % 2 == 0 ? s.classNameFieldEven : ""}`}>
                            {
                                (isEdit || isDelete || isInfo || isAssign) &&
                                <TableData item={item} key={999999} handlerAction={handlerAction}>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isDelete && typeId !== 5 && typeId !== 6 &&
                                            <span className={`${s.tooltip} ${s.deleteSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.delete}`}>Delete</span>
                                            <TrashIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "delete")}
                                            />
                                            </span>
                                        }
                                        {
                                            isEdit && typeId !== 5 && typeId !== 6 &&
                                            <span className={`${s.tooltip} ${s.editSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.edit}`}>Edit</span>
                                            <EditIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "edit")}
                                            />
                                            </span>
                                        }
                                        {
                                            isInfo &&
                                            <span className={`${s.tooltip} ${s.infoSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.info}`}>Info</span>
                                            <InfoIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "info")}
                                            />
                                            </span>
                                        }

                                        {isClaim && typeId === 2 &&
                                            <span className={`${s.tooltip} ${s.claimSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.claim}`}>Claim</span>
                                            <ClaimTrip
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "claim")}
                                            />
                                                </span>
                                        }
                                        {isRemove && typeId === 1 &&
                                            <span className={`${s.tooltip} ${s.reRouteSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.reRoute}`}>ReRoute</span>
                                            <RemoveIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "reRoute")}
                                            />
                                                  </span>
                                        }
                                        {
                                            isAssign && typeId === 1 &&
                                            <span className={`${s.tooltip} ${s.historySpan}`}>
                                            <span className={`${s.tooltiptext} ${s.history}`}>Assign</span>
                                            <AssignIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "assign")}
                                            />
                                            </span>
                                        }
                                        {
                                            isGetHistory &&
                                            <span className={`${s.tooltip} ${s.historySpan}`}>
                                            <span className={`${s.tooltiptext} ${s.history}`}>History</span>
                                            <ActivityIcon
                                                className={`${s.icon} `}
                                                onClick={() => handlerAction(item.id, "history")}
                                            />
                                        </span>
                                        }{
                                        isAssignVendor && (typeId === 2 || typeId === 1 || typeId === 4) &&
                                        <span className={`${s.tooltip} ${s.assignVendorSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.assignVendor}`}>Assign</span>
                                        <AssignVendorIcon
                                            className={s.icon}
                                            onClick={() => handlerAction(item.id, "assignVendor")}
                                        />
                                        </span>
                                    }
                                    </div>
                                </TableData>
                            }
                            {
                                keys.map((key: any, i: number) => {
                                        return i !== 0 && key !== "car_name" && (
                                            <TableData key={key} item={item} className={key}
                                                       handlerAction={handlerAction}>
                                                {(key !== "car_id" ? item[key] : item["car_id"] != null ? item["car_name"] : "")}
                                            </TableData>
                                        );
                                    }
                                )
                            }

                        </TableRow>
                    );
                })
        }
        </tbody>
    );
};


export default TableBody;
