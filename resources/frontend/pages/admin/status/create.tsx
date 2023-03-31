import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Create from "../../layouts/templates/create/create";
import Select, { IOption } from "../../../components/select/select";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import s from "../../layouts/templates/create/create.module.scss";
import { AdminApi } from "../../../api/admin-api/admin-api";
interface IUserCreate {
    path: string,
    statusId?: number
}


const StatusCreate: React.FC<IUserCreate> = ({ statusId }) => {
    const { t } = useTranslation();
    const crudKey = "changeStatus";
    const redirectKey = `status`;
    const [status, setStatus] = useState<IOption>({
        "id": 1,
        "value": "gender",
        "label": "gender"
    });
    const [fields, setFields] = useState<Array<IItem>>([]);
    const [data, setData] = useState(null);
    // var fields:Array<IItem> = [
    //     { name: "name", type: "input", label: "statusName" },
    //     { name: "slug", type: "input", label: "slug" },
    //     { name: "id", type: "hidden", inputType: "hidden" }
    // ];
    const tabs = [
        {
            id: 1,
            value: "gender",
            label: "gender",
        },
        {
            id: 2,
            value: "request_type",
            label: "request_type"
        },
        {
            id: 3,
            value: "los",
            label: "los"
        },
        {
            id: 4,
            value: "status",
            label: "status",
        },
        {
            id: 5,
            value: "reasons",
            label: "reasons"
        },
        {
            id: 6,
            value: "artificial",
            label: "artificial"
        },
        {
            id: 7,
            value: "waitDuration",
            label: "waitDuration"
        },
        {
            id: 8,
            value: "services",
            label: "services",
        }
    ];
    useEffect(() => {
        (async () => {
            if (status !== null && (status.id === 3)) {
                const data = await AdminApi.createStatus(crudKey, status.id);
                setData(data);
                setFields([
                    {name: "status", type: "select"},
                    ///  { name: "slug", type: "input", label: "slug" },
                    { name: "id", type: "hidden", inputType: "hidden" },
                    { name: "services", type: "multiSelect", label: "services" }
                ]);
            } else if (status !== null) {
                setFields([
                    { name: "name", type: "input", label: "statusName" },
                    ///     { name: "slug", type: "input", label: "slug" },
                    { name: "id", type: "hidden", inputType: "hidden" }
                ]);
            }
        })();
    }, [status]);

    const requiredFields = [
        ///  "slug",
        "name"
    ];
    return <>
        <div className={s.item}>
            <div className={s.select}>
                <Select
                    label={"status"}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    onChange={(options: IOption) => setStatus(options)}
                    /// onChange={handlerSetCar}
                    options={tabs}
                    // value={selectedTitle}
                    name={"Cars"}
                    isMulti={false}
                    value={status}
                    allowValueClear={false}
                />
            </div>
            <div className={s.mainForm}>
                {(status.id === 3 ? data : true) && <Create
                    crudKey={`${crudKey}/${status.id}`}
                    data={data}
                    redirectKey={redirectKey}
                    fields={fields}
                    title={""}
                    requiredFields={requiredFields}
                    children={t("create")}
                />}
            </div>
        </div>
        {/*{fields.length > 0 && <Create*/}
        {/*    crudKey={`${crudKey}/${status.id}`}*/}
        {/*    redirectKey={redirectKey}*/}
        {/*    fields={fields}*/}
        {/*    title={""}*/}
        {/*    requiredFields={requiredFields}*/}
        {/*    children={t("create")}*/}
        {/*/>}*/}
    </>;

};

export default StatusCreate;
