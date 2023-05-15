import React, { useEffect, useState } from "react";
import Edit from "../../../layouts/templates/edit/edit";
import { IItem } from "../../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../../api/admin-api/admin-api";

interface IVendorEditItem {
    path: string;
    id?: number;
}

const VendorEdit: React.FC<IVendorEditItem> = ({ id }) => {
    const { t } = useTranslation();
    const crudKey = "vendors";
    const [data, setData] = useState(null);
    const fields: Array<IItem> = [
        { name: "companyName", type: "input", label: "companyName" },
        { name: "email", type: "input", label: "email" },
        { name: "address", type: "input", label: "address" },
        { name: "phone_number", type: "input", label: "phone_number", inputType: "tel" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "password", type: "password", inputType: "password", label: "" },
        { name: "pages", type: "multiSelect", label: "pages" },
        { name: "fields", type: "multiSelect", label: "fields" },
        { name: "los", type: "multiSelect", inputType: "los" },





    ];
    const requiredFields = [
        "companyName",
       /// "password",
        "fields",
        "email",
        "address",
        "phone_number",
        "los",
        "fields"
    ];

    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.editUserData(crudKey, id);
                setData(data);

            }
        )();

    }, []);
    return (
        data &&
        <Edit
            crudKey={`admin/${crudKey}`}
            data={data}
            requiredFields={requiredFields}
            fields={fields}
            title={""}
            children={t("update")}
            isStatus={false}
        />
    );
};

export default VendorEdit;
