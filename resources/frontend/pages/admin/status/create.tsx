import React, { useEffect, useState } from "react";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import Create from "../../layouts/templates/create/create";
import { AdminApi } from "../../../api/admin-api/admin-api";

interface IUserCreate {
    path: string,
    statusId?: number
}


const StatusCreate: React.FC<IUserCreate> = ({statusId }) => {
    const { t } = useTranslation();
    const crudKey = "changeStatus";
    const redirectKey = `status`;
    const fields: Array<IItem> = [
        { name: "name", type: "input", label: "statusName" },
        { name: "slug", type: "input", label: "slug" },
        { name: "id", type: "hidden", inputType: "hidden" }
    ];


    const requiredFields = [
        'slug',
        'name',
    ];
    return <Create
        crudKey={`${crudKey}/${statusId}`}
        redirectKey={redirectKey}
        fields={fields}
        title={""}
        requiredFields={requiredFields}
        children={t("create")}
    />;

};

export default StatusCreate;
