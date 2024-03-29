import React, { useEffect, useState } from "react";
import Edit from "../../../layouts/templates/edit/edit";
import { IItem } from "../../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { homeAPI } from "../../../../api/site-api/home-api";

interface IUsersEditItem {
    path: string;
    id?: number;
}

const VendorDriverEdit: React.FC<IUsersEditItem> = ({ id }) => {
    const { t } = useTranslation();
    const crudKey = "vendorClients";
    const redirectKey = "users";

    const [data, setData] = useState(null);
    const fields: Array<IItem> = [
        // {name: 'image', type: 'file', label: 'image'},
        { name: "name", type: "input", label: "name" },
        { name: "surname", type: "input", label: "surName" },
        { name: "email", type: "input", label: "email" },
        { name: "address", type: "input", label: "address" },
        { name: "birthday", type: "input", label: "birthDate" },
        { name: "phone_number", type: "input", label: "phone_number", inputType: "tel" },
        { name: "password", type: "password", label: "password", inputType: "password" },
        ///  {name: 'roles', type: 'select', label: 'role'},
        { name: "license", type: "file", label: "Driver License" },
        { name: "picture", type: "file", label: "Driver Picture", inputType: "hidden" },
        { name: "sex_offender_check", type: "file", label: "Sex Offender Check " },
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
                const data = await homeAPI.editUserData(crudKey, id);
                setData(data);

            }
        )();

    }, []);
    const requiredFields = [
        "name",
        "license",
        "picture",
        "sex_offender_check",
        "motor_vehicle_record",
        "defensive_driving",
        "wheelchair_securement",
        "pass_basic",
        "emt_1",
        "first_aid",
        "company_training"
    ];
    return (
        data &&
        <Edit
            crudKey={crudKey}
            data={data}
            redirectKey={redirectKey}
            requiredFields={requiredFields}
            fields={fields}
            title={""}
            children={t("update")}
        />
    );
};

export default VendorDriverEdit;
