import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import TrashIcon from "-!svg-react-loader!../../../images/trash.svg";
import EditIcon from "-!svg-react-loader!../../../images/edit.svg";
import UsersIcon from "-!svg-react-loader!../../../images/Users.svg";
import ActivityIcon from "-!svg-react-loader!../../../images/Actions.svg";
import CLoseMessage from "-!svg-react-loader!../../../images/close-message.svg";
import OpenMessage from "-!svg-react-loader!../../../images/open.svg";
import s from "../crud-table.module.scss";
import { useTranslation } from "react-i18next";

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean,
    isGetHistory: boolean
    isGetInfo: boolean
    isGetItems: boolean
    handlerAction: (action: string, id: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isGetItems,
        isGetInfo,
        isGetHistory,
        handlerAction
    }) => {
    const { t } = useTranslation();
    let count = 0;

    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item);
                    return (
                        <TableRow key={index} className={++count % 2 == 0 ? s.classNameFieldEven : ""}>
                            {
                                keys.length > 0 &&
                                (
                                    keys
                                        .map((key, i) => {

                                                if (key == "fields") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i} className={s.address}
                                                                   isGetInfo={isGetInfo}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            {item[key].map((e: string, ind: number) => {
                                                                return <span key={ind}
                                                                             className={s.label_span}>{t(e)}</span>;
                                                            })}
                                                        </TableData>
                                                    );
                                                } else if (key == "image") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            <img src={item[key]} alt="" />
                                                        </TableData>
                                                    );
                                                } else if (key == "operatorAction") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            <span className={s.label_span}> {t(item[key])}</span>
                                                        </TableData>
                                                    );
                                                } else if (key == "new") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            {item[key] ? <CLoseMessage /> : <OpenMessage />}
                                                        </TableData>
                                                    );
                                                } else {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            {item[key]}
                                                        </TableData>
                                                    );
                                                }

                                            }
                                        )
                                )
                            }

                            {
                                (isEdit || isDelete || isGetItems || isGetHistory) &&
                                <TableData isGetInfo={isGetInfo} className={s.iconsWrapper}>

                                    {
                                        isEdit &&
                                        <div className={s.iconWrapper}>
                                            <div className={s.iconLabel}>Edit</div>
                                            <EditIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction("edit", item.id)}
                                            />
                                        </div>
                                    }
                                    {
                                        isGetItems &&
                                        <div className={s.iconWrapper}>
                                            <div className={s.iconLabel}>Users</div>
                                            <UsersIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction("getVendorUser", item.id)}
                                            />
                                        </div>
                                    }
                                    {
                                        isGetHistory &&
                                        <div className={s.iconWrapper}>
                                            <div className={s.iconLabel}>Activity</div>
                                            <ActivityIcon
                                            className={s.editIcon}
                                            onClick={() => handlerAction("history", item.id)}
                                        />
                                        </div>
                                    }
                                    {
                                        isDelete &&
                                        <div className={s.iconWrapper}>
                                            <div className={s.iconLabel}>Delete</div>
                                               <TrashIcon
                                            className={s.trashIcon}
                                            onClick={() => handlerAction("delete", item.id)}
                                        />
                                        </div>
                                    }

                                </TableData>
                            }

                        </TableRow>
                    );
                })
        }
        </tbody>
    );
};


export default TableBody;
