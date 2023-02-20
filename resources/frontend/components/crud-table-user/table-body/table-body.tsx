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
import ActivityIcon from "-!svg-react-loader!../../../images/user-activity-svgrepo-com.svg";

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

    return (
        <tbody>

        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item);
                    return keys.length > 0 && (

                        <TableRow key={index} data-rowid={item["id"]}
                                  className={selectedIds?.includes(item["id"]) ? `${s.chosen}` : ""}>
                            {
                                (isEdit || isDelete || isInfo || isAssign) &&
                                <TableData item={99999} key={999999}>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isDelete &&
                                            <TrashIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "delete")}
                                            />
                                        }
                                        {
                                            isEdit &&
                                            <EditIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "edit")}
                                            />
                                        }
                                        {
                                            isInfo &&
                                            <InfoIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "info")}
                                            />
                                        }
                                        {isClaim && typeId === 2 &&
                                            <ClaimTrip
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "claim")}
                                            />
                                        }
                                        {isRemove && typeId === 1 &&
                                            <RemoveIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "remove")}
                                            />
                                        }

                                        {
                                            isAssign && typeId === 1 &&
                                            <AssignIcon
                                                className={s.icon}
                                                onClick={() => handlerAction(item.id, "assign")}
                                            />
                                        } {
                                        isGetHistory &&
                                        <ActivityIcon
                                            className={s.icon}
                                            onClick={() => handlerAction(item.id, "history")}
                                        />
                                    }{
                                        isAssignVendor && (typeId === 2 || typeId === 1 || typeId === 4) &&
                                        <AssignVendorIcon
                                            className={s.icon}
                                            onClick={() => handlerAction(item.id, "assignVendor")}
                                        />
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
