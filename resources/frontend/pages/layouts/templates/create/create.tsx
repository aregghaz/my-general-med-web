import React from "react";
import s from "./create.module.scss";
import FormikHandler, { IItem } from "../formik-handler/formik-handler";
import Button from "../../../../components/button/button";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useNavigate } from "@reach/router";
import populateCreateFormFields from "../../../../constants/populateCreateFormFields";
import { AdminApi } from "../../../../api/admin-api/admin-api";
import validationRules from "../../../../utils/validationRule";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ICreate {
    data?: { [key: string]: Object }
    fields: Array<IItem>
    crudKey?: string
    isAdmin?: boolean
    selectRange?: boolean
    redirectKey?: string
    title: string,
    requiredFields?: Array<string>
}


const Create: React.FC<ICreate> = (
    {
        fields,
        crudKey,
        data,
        selectRange,
        isAdmin = true,
        children,
        redirectKey,
        requiredFields,
    }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();


    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);
    const create = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        if (crudKey == "vendorClients") {
            formData.append("picture", values["picture"]);
            formData.append("sex_offender_check", values["sex_offender_check"]);
            formData.append("motor_vehicle_record", values["motor_vehicle_record"]);
            formData.append("defensive_driving", values["defensive_driving"]);
            formData.append("wheelchair_securement", values["wheelchair_securement"]);
            formData.append("pass_basic", values["pass_basic"]);
            formData.append("emt_1", values["emt_1"]);
            formData.append("first_aid", values["first_aid"]);
            formData.append("company_training", values["company_training"]);
            formData.append("license", values["license"]);
            formData.append("drug_test", values["drug_test"]);

        }

        formData.append("value", JSON.stringify(values));
        const res: any = await AdminApi.store(formData, crudKey, isAdmin);
        if (Number(res.status === 200)) {
            const options = {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT
            };

            toast(t("record_successfully_added"), options);
            await navigate(-1);
        }
    };

    return (
        <div>

            <Formik
                selectOptions={data || {}}
                initialValues={populateCreateFormFields(fields, data)}
                onSubmit={create}
                validate={(values: FormikValues) => validate(values)}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      errors
                  }) => {
                    return (
                        <>
                            <form className={s.form}>
                                {
                                    fields
                                        .map((field, index) => {
                                                if (data && data[field.name]) {
                                                    return <div
                                                        key={index}
                                                        className={s.item}
                                                        style={field.type == "hidden" ? { display: "none" } : {}}
                                                    >
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            selectRange={selectRange}
                                                            setFieldValue={setFieldValue}
                                                            selectOptions={data}
                                                            requiredFields={requiredFields}
                                                            errors={errors}
                                                        />
                                                    </div>;
                                                } else {
                                                    return <div
                                                        key={index}
                                                        className={s.item}
                                                        style={field.type == "hidden" ? { display: "none" } : {}}
                                                    >
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            selectRange={selectRange}
                                                            setFieldValue={setFieldValue}
                                                            requiredFields={requiredFields}
                                                            errors={errors}
                                                        />
                                                    </div>;
                                                }

                                            }
                                        )
                                }
                                <div className={s.buttonDiv}>
                                    <Button
                                        type={"adminUpdate"}
                                        onClick={handleSubmit}
                                        className={"admin"}
                                    >
                                        {children}
                                    </Button>
                                </div>

                            </form>

                        </>

                    );
                }
                }

            </Formik>

        </div>
    );
};


export default Create;
