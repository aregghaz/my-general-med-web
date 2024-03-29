import React, { useEffect, useState } from "react";
import Edit from "../../layouts/templates/edit/edit";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";

interface IUsersEditItem {
    path: string;
    id?: number;
    statusId?: number;
}

const StatusEdit: React.FC<IUsersEditItem> = ({ id, statusId }) => {
    const { t } = useTranslation();
    const crudKey = `changeStatus`;
    const redirectKey = `status`;
    const [data, setData] = useState(null);
    const [fields, setFields] = useState<Array<IItem>>([]);


    useEffect(() => {
        (
            async () => {
                if (statusId == 3) {
                    setFields([
                        { name: "name", type: "input", label: "statusName" },
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
                const data = await AdminApi.changeStatus(crudKey, id, statusId);
                setData(data);
            }
        )();

    }, []);
    const requiredFields = [
        // 'make',
        // 'model',
        "slug",
        "name"
        // 'inspection',
        // 'insurance',
        // 'liability',
    ];
    return (
        data &&
        <Edit
            crudKey={`admin/${crudKey}/${statusId}`}
            data={data}
            redirectKey={`admin/${redirectKey}`}
            requiredFields={requiredFields}
            fields={fields}
            title={""}
            children={t("update")}
            isStatus={true}
        />
    );
};

export default StatusEdit;
