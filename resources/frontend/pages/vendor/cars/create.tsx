import React, { useEffect, useState } from "react";
import FormikHandler, { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { vendorAPI } from "../../../api/site-api/vendor-api";
import { useNavigate } from "@reach/router";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import validationRules from "../../../utils/validationRule";
import { Formik } from "formik";
import Button from "../../../components/button/button";
import populateCreateFormFields from "../../../constants/populateCreateFormFields";
import s from "./car.module.scss";
import Select, { IOption } from "../../../components/select/select";
import AsyncSelect from "../../../components/select/async-select";
import getFieldLabel from "../../../utils/getFieldLabel";

interface IUserCreate {
    path: string;
}


const CarsCreate: React.FC<IUserCreate> = () => {
        const { t } = useTranslation();
        const crudKey = "cars";
        const [data, setData] = useState(null);
        const [make, setMake] = useState([]);
        const fields: Array<IItem> = [
            { name: "year", type: "select", label: "Year" },
            { name: "registration", type: "input", label: "Car registration" },
            { name: "front", type: "file", label: "Car front photo", inputType: "hidden" },
            { name: "rear", type: "file", label: "Car rear photo", inputType: "hidden" },
            { name: "right", type: "file", label: "Car right side photo", inputType: "hidden" },
            { name: "left", type: "file", label: "Car left side photo", inputType: "hidden" },
            { name: "interior_1", type: "file", label: "Car interior photo 1", inputType: "hidden" },
            { name: "interior_2", type: "file", label: "Car interior photo 2", inputType: "hidden" },
            { name: "inspection", type: "file", label: "Car inspection" },
            { name: "insurance", type: "file", label: "Car insurance" },
            { name: "liability", type: "file", label: "Car liability" }

        ];
    const fields2: Array<IItem> = [
        { name: "year", type: "select", label: "Year" },
        { name: "registration", type: "input", label: "Car registration" },
        { name: "step", type: "input", label: "Car registration" },
        { name: "make", type: "select", label: "Make"},
        { name: "model", type: "select", label: "Model"},
        { name: "drivers", type: "select", label: "Assign drivers"},
        { name: "front", type: "file", label: "Car front photo", inputType: "hidden" },
        { name: "rear", type: "file", label: "Car rear photo", inputType: "hidden" },
        { name: "right", type: "file", label: "Car right side photo", inputType: "hidden" },
        { name: "left", type: "file", label: "Car left side photo", inputType: "hidden" },
        { name: "interior_1", type: "file", label: "Car interior photo 1", inputType: "hidden" },
        { name: "interior_2", type: "file", label: "Car interior photo 2", inputType: "hidden" },
        { name: "inspection", type: "file", label: "Car inspection" },
        { name: "insurance", type: "file", label: "Car insurance" },
        { name: "liability", type: "file", label: "Car liability" }

    ];
        useEffect(() => {
            (
                async () => {
                    const data = await vendorAPI.createUserData(crudKey);

                    setData(data);
                }
            )();

        }, []);
        const requiredFields = [
            'make',
            'model',
            'year',
            "registration",
            'inspection',
            'insurance',
            'liability',
            "front",
            "rear",
            "right",
            "left",
            "interior_1",
            "interior_2",

        ];

        const navigate = useNavigate();

        const validate = (values: FormikValues) => validationRules(values, requiredFields, fields2, t);

        const create = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
            setSubmitting(true);
            const formData: FormData = new FormData();
            formData.append("inspection", values["inspection"]);
            formData.append("insurance", values["inspection"]);
            formData.append("liability", values["inspection"]);
            formData.append("front", values["front"]);
            formData.append("rear", values["rear"]);
            formData.append("right", values["right"]);
            formData.append("left", values["left"]);
            formData.append("interior_1", values["inspection"]);
            formData.append("interior_2", values["inspection"]);
            formData.append("value", JSON.stringify(values));
            const res: any = await AdminApi.store(formData, crudKey, false);
            if (Number(res.status === 200)) await navigate(`/${crudKey}`);
        };

        const loadOptions4 = async (id: number) => {
            const data = await vendorAPI.getModel(id);
            setMake(data.make);

        };

        const loadOptions3 = async () => {
            // console.log(make, "aaa");
            return data["make"];


        };
        return data && (
            <div>

                <Formik
                    selectOptions={data}
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
                                    <div className={s.item}>
                                        {
                                            <AsyncSelect
                                                loadOptions={loadOptions3}
                                                defaultValue={values["make"]}
                                                getOptionValue={(option: IOption) => option.value}
                                                getOptionLabel={(option: IOption) => option.label}
                                                ///
                                                options={data ? data["make"] : data}
                                                /// options={selectOptions}
                                                onChange={(option: IOption) => {
                                                    setFieldValue("make", option);
                                                    loadOptions4(option.id);
                                                }}
                                                ///       label={t("make")}
                                                isSearchable={false}
                                                name={"make"}
                                                placeholder={t("make")}
                                                label={getFieldLabel(t,"Make", "make", requiredFields)}
                                                error={errors["make"]}
                                            />
                                        }
                                    </div>
                                    <div className={s.item}>
                                        {

                                            <Select
                                                value={values["model"]}
                                                getOptionValue={(option: IOption) => option.value}
                                                getOptionLabel={(option: IOption) => option.label}
                                                ///
                                                options={make}
                                                /// options={selectOptions}
                                                onChange={(option: IOption) => setFieldValue("model", option)}

                                                ///   label={t("model")}
                                                isSearchable={false}
                                                name={"model"}
                                                label={getFieldLabel(t,"Model", "model", requiredFields)}
                                                error={errors["model"]}
                                                placeholder={t("model")}
                                            />
                                        }

                                    </div>
                                    <div className={s.item}>
                                        {
                                            <Select
                                                value={values["drivers"]}
                                                getOptionValue={(option: IOption) => option.slug}
                                                getOptionLabel={(option: IOption) => option.label}
                                                isMulti={true}
                                                ///
                                                options={data ? data["drivers"] : data}
                                                /// options={selectOptions}
                                                onChange={(option: IOption) => setFieldValue("drivers", option)}
                                                hideSelectedOptions={true}
                                                // label={t("assignDriver")}
                                                isSearchable={true}
                                                name={"drivers"}
                                                placeholder={t("assignDriver")}
                                            />
                                        }
                                    </div>
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
                                            save
                                        </Button>
                                    </div>

                                </form>

                            </>

                        );
                    }
                    }

                </Formik>

            </div>
        )
            ;

    }
;

export default CarsCreate;
