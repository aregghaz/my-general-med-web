import React, { useEffect, useState } from "react";
import FormikHandler, { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import Create from "../../layouts/templates/create/create";
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

interface IUserCreate {
    path: string;
}


const CarsCreate: React.FC<IUserCreate> = () => {
    const { t } = useTranslation();
    const crudKey = "cars";
    const [data, setData] = useState(null);
    const [make, setMake] = useState([]);
    const fields: Array<IItem> = [
        { name: "year", type: "select", label: "year" },
        { name: "registration", type: "input", label: "registration" },
        { name: "inspection", type: "file", label: "inspection" },
        { name: "insurance", type: "file", label: "insurance" },
        { name: "liability", type: "file", label: "liability" },
        { name: "front", type: "file", label: "Front image" },
        { name: "rear", type: "file", label: "Rear" },
        { name: "right", type: "file", label: "Right Side" },
        { name: "left", type: "file", label: "Left Side" },
        { name: "interior_1", type: "file", label: "interior_1" },
        { name: "interior_2", type: "file", label: "interior_2" }

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
        // 'make',
        // 'model',
        // 'year',
        'registration',
        // 'inspection',
        // 'insurance',
        // 'liability',
    ];

    const navigate = useNavigate();

    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);

    const create = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        formData.append('inspection', values['inspection'])
        formData.append('insurance', values['inspection'])
        formData.append('liability', values['inspection'])
        formData.append('front', values['inspection'])
        formData.append('rear', values['inspection'])
        formData.append('right', values['inspection'])
        formData.append('left', values['inspection'])
        formData.append('interior_1', values['inspection'])
        formData.append('interior_2', values['inspection'])
        formData.append("value", JSON.stringify(values));
        const res: any = await AdminApi.store(formData, crudKey, false);
        if (Number(res.status === 200)) await navigate(`/${crudKey}`);
    };

    const loadOptions4 = async (id:number) => {
        const data = await vendorAPI.getModel(id);
        setMake(data.make)

    };

    const loadOptions3 = async () => {
        console.log(make,"aaa");
        return data['make'];


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
                                        label={"make"}
                                        isSearchable={false}
                                        name={"make"}
                                        placeholder={"make"}
                                    />
                                }
                                {
                                    <Select
                                        value={values['model']}
                                        getOptionValue={(option: IOption) => option.value}
                                        getOptionLabel={(option: IOption) => option.label}
                                        ///
                                        options={make}
                                        /// options={selectOptions}
                                        onChange={(option: IOption) => setFieldValue("model", option)}

                                        label={"model"}
                                        isSearchable={false}
                                        name={"model"}
                                        placeholder={"model"}
                                    />
                                }
                                {
                                    <Select
                                        value={values['drivers']}
                                        getOptionValue={(option: IOption) => option.slug}
                                        getOptionLabel={(option: IOption) => option.label}
                                        isMulti={true}
                                        ///
                                        options={data ? data["drivers"] : data}
                                        /// options={selectOptions}
                                        onChange={(option: IOption) => setFieldValue("drivers", option)}
                                        hideSelectedOptions={true}
                                        label={"drivers"}
                                        isSearchable={true}
                                        name={"drivers"}
                                        placeholder={"drivers"}
                                    />
                                }
                                {
                                    fields
                                        .map((field, index) => {
                                                if (data && data[field.name]) {
                                                    return <div key={index} className={s.item}>
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
                                                    return <div key={index} className={s.item}>
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
    );

};

export default CarsCreate;
