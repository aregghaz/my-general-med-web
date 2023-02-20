import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import TrashIcon from "-!svg-react-loader!../../../images/trash.svg";
import EditIcon from "-!svg-react-loader!../../../images/edit.svg";
import UsersIcon from "-!svg-react-loader!../../../images/Users.svg";
import ActivityIcon from "-!svg-react-loader!../../../images/user-activity-svgrepo-com.svg";
import s from "../crud-table.module.scss";
import { useTranslation } from "react-i18next";

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean,
    isGetHistory: boolean
    isGetItems: boolean
    handlerAction: (action: string, id: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isGetItems,
        isGetHistory,
        handlerAction
    }) => {
    const { t } = useTranslation();
    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item);
                    return (
                        <TableRow key={index}>
                            {
                                keys.length > 0 &&
                                (
                                    keys
                                        .map((key, i) => {

                                                if (key == "fields") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
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
                                                        <TableData data={item.id} key={i}
                                                                   handlerAction={handlerAction}
                                                        >
                                                            <img src={item[key]} alt="" />
                                                        </TableData>
                                                    );
                                                }else if (key == "operatorAction") {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
                                                                   handlerAction={handlerAction}
                                                        >
                                                           <span  className={s.label_span}> {t(item[key])}</span>
                                                        </TableData>
                                                    );
                                                } else {
                                                    return i != 0 && (
                                                        <TableData data={item.id} key={i}
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
                                <TableData>
                                    <div className={s.iconsWrapper}>
                                        {
                                            isEdit &&
                                            <EditIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction('edit',item.id)}
                                            />
                                        }
                                        {
                                            isGetItems &&
                                            <UsersIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction('getVendorUser', item.id)}
                                            />
                                        }
                                        {
                                            isGetHistory &&
                                            <ActivityIcon
                                                className={s.editIcon}
                                                onClick={() => handlerAction('history',item.id)}
                                            />
                                        }
                                        {
                                            isDelete &&
                                            <TrashIcon
                                                className={s.trashIcon}
                                                onClick={() => handlerAction('delete',item.id)}
                                            />
                                        }
                                    </div>
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
