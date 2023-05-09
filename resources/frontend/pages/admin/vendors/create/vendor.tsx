import React, { useEffect, useState } from "react";
import { IItem } from "../../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import Create from "../../../layouts/templates/create/create";
import { AdminApi } from "../../../../api/admin-api/admin-api";

interface IVendorCreate {
    path: string;
}


const VendorCreate: React.FC<IVendorCreate> = () => {
    const { t } = useTranslation();
    const crudKey = "vendors";
    const [data, setData] = useState(null);
    const fields: Array<IItem> = [
        { name: "companyName", type: "input", label: "companyName", placeholder: "Company name" },
        { name: "email", type: "input", label: "email", placeholder: "Email" },
        { name: "address", type: "input", label: "address", placeholder: "Address" },
        { name: "phone_number", type: "input", label: "phone_number", inputType: "tel", placeholder: "Phone number" },
        { name: "password", type: "password", inputType: "password", autoComplete: "new-password", placeholder: "Password"},
        { name: "los", type: "multiSelect", inputType: "los", label: "los", placeholder: "LOS"},
        { name: "fields", type: "multiSelect", label: "fields", placeholder: "Table fields"},
        { name: "id", type: "hidden", inputType: "hidden" },

    ];
    const requiredFields = [
        "companyName",
        "password",
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
                const data = await AdminApi.createItem(crudKey);

                setData(data);
            }
        )();

    }, []);


    return data && <Create
        crudKey={crudKey}
        requiredFields={requiredFields}
        data={data}
        fields={fields}
        title={""}
        children={t("create")}
    />;

};

export default VendorCreate;
