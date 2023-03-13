import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Create from "../../layouts/templates/create/create";
import Select, { IOption } from "../../../components/select/select";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import s from "../../layouts/templates/create/create.module.scss";

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

    // var fields:Array<IItem> = [
    //     { name: "name", type: "input", label: "statusName" },
    //     { name: "slug", type: "input", label: "slug" },
    //     { name: "id", type: "hidden", inputType: "hidden" }
    // ];
    useEffect(() => {
        console.log(status,'status');
        if (status !== null && (status.id === 7 || status.id === 8)) {
            setFields([
                { name: "name", type: "input", label: "statusName" },
                { name: "slug", type: "input", label: "slug" },
                { name: "id", type: "hidden", inputType: "hidden" },
                { name: "price", type: "input", label: "price" }
            ])
        } else if(status !== null) {
            setFields([
                { name: "name", type: "input", label: "statusName" },
                { name: "slug", type: "input", label: "slug" },
                { name: "id", type: "hidden", inputType: "hidden" },
            ])
        }
    }, [status]);


    const tabs = [
        {
            id: 1,
            value: "gender",
            label: "gender"
        },
        {
            id: 4,
            value: "request_type",
            label: "request_type"

        }, {
            id: 3,
            value: "los",
            label: "los"

        },
        {
            id: 5,
            value: "status",
            label: "status"

        }, {
            id: 6,
            value: "reasons",
            label: "reasons"

        }, {
            id: 8,
            value: "artificial",
            label: "artificial"

        }, {
            id: 7,
            value: "waitDuration",
            label: "waitDuration"

        }
    ];


    const requiredFields = [
        "slug",
        "name"
    ];
    return <>
          <div className={s.item}>
              <div className={s.select}>
                  <Select
                      label={'status'}
                      getOptionValue={(option: IOption) => option.value}
                      getOptionLabel={(option: IOption) => t(option.label)}
                      onChange={(options: IOption) => setStatus(options)}
                      /// onChange={handlerSetCar}
                      options={tabs}
                      // value={selectedTitle}
                      name={"Cars"}
                      isMulti={false}
                      value={status}
                  />
              </div>
              <div className={s.mainForm}>
                  <Create
                      crudKey={`${crudKey}/${status.id}`}
                      redirectKey={redirectKey}
                      fields={fields}
                      title={""}
                      requiredFields={requiredFields}
                      children={t("create")}
                  />
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
