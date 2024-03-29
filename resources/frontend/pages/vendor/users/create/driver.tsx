import React, { useEffect, useState } from "react";
import { IItem } from "../../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import Create from "../../../layouts/templates/create/create";
import { vendorAPI } from "../../../../api/site-api/vendor-api";

interface IUserCreate {
    path: string;
}


const VendorDriverCreate: React.FC<IUserCreate> = () => {
    const { t } = useTranslation();
    const crudKey = "vendorClients";
    const redirectKey = "users";
    const [data, setData] = useState(null);
    const fields: Array<IItem> = [
        // {name: 'image', type: 'file', label: 'image'},
        { name: "name", type: "input", label: "name", placeholder: "First name"},
        { name: "surname", type: "input", label: "surname", placeholder: "Last Name"},
        { name: "email", type: "input", label: "email", placeholder: "Email"},
        { name: "address", type: "input", label: "address", placeholder: "Address"},
        { name: "birthday", type: "datepicker", label: "birthDate"},
        { name: "phone_number", type: "input", label: "phone_number", inputType: "tel", placeholder: "Phone number"},
        { name: "password", type: "password", label: "password", inputType: "password", autoComplete: "new-password", placeholder: "Password"},
        ///  {name: 'roles', type: 'select', label: 'role'},
        { name: "license", type: "file", label: "Driver License" },
        { name: "picture", type: "file", label: "Driver Picture", inputType: "hidden" },
        { name: "sex_offender_check", type: "file", label: "Sex Offender Check" },
        { name: "motor_vehicle_record", type: "file", label: "Motor Vehicle Record" },
        { name: "defensive_driving", type: "file", label: "Defensive Driving Certificate" },
        { name: "wheelchair_securement", type: "file", label: "Wheelchair Securement Certificate" },
        { name: "pass_basic", type: "file", label: "Pass Basic" },
        { name: "emt_1", type: "file", label: "EMT 1 Certificate" },
        { name: "first_aid", type: "file", label: "First Aid and CPR Certificate" },
        { name: "company_training", type: "file", label: "Company Training Letter" },
        { name: "drug_test", type: "file", label: "Drug Test" },
        { name: "id", type: "hidden", inputType: "hidden" }
    ];
    useEffect(() => {
        (
            async () => {
                const data = await vendorAPI.createUserData("vendorClients");

                setData(data);
            }
        )();

    }, []);
    const requiredFields = [
        "name",
        "surname",
        "address",
        "birthday",
        "phone_number",
        "password",
        "email",
        "license",
        "picture",
        "sex_offender_check",
        "motor_vehicle_record",
        "defensive_driving",
        "wheelchair_securement",
        "pass_basic",
        "emt_1",
        "first_aid",
        "company_training",
        "drug_test"
    ];

    return  <Create
        crudKey={crudKey}
        redirectKey={redirectKey}
       // data={data}
        fields={fields}
        isAdmin={false}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
    />;

};

export default VendorDriverCreate;
