import React, { useEffect, useState } from "react";
import { IItem } from "../../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import Create from "../../../layouts/templates/create/create";
import { AdminApi } from "../../../../api/admin-api/admin-api";

interface IVendorCreate {
    path: string;
}


const OperatorCreate: React.FC<IVendorCreate> = () => {
    const { t } = useTranslation();
    const crudKey = "operators";
    const redirectKey = "vendors";
    const [data, setData] = useState(null);
    const fields: Array<IItem> = [
        { name: "name", type: "input", label: "name", placeholder: "First name" },
        { name: "surname", type: "input", label: "surname", placeholder: "Last name" },
        { name: "email", type: "input", label: "email", placeholder: "Email" },
        { name: "address", type: "input", label: "address", placeholder: "Address" },
        { name: "phone_number", type: "input", label: "phone_number", inputType: "tel", placeholder: "Phone number"},
        { name: "fields", type: "multiSelect", label: "fields", placeholder: "Table fields" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "password", type: "password", inputType: "password", placeholder: "Password", autoComplete: "new-password",}
    ];
    const requiredFields = [
        "name",
        "password",
        "fields",
        "name",
        "surname",
        "email",
        "address",
        "phone_number",
    ];
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.createItem(crudKey);

                setData(data);
            }
        )();

    }, []);


    return data && <Create
        crudKey={crudKey}
        requiredFields={requiredFields}
        data={data}
        redirectKey={redirectKey}
        fields={fields}
        title={""}
        children={t("create")}
    />;

};

export default OperatorCreate;
