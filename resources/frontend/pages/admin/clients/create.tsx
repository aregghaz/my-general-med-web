import React, { useEffect, useState } from "react";
import FormikHandler, { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { Formik, FormikHelpers } from "formik";
import { FormikValues } from "formik/dist/types";
import s from "../../vendor/cars/car.module.scss";
import AsyncSelect from "../../../components/select/async-select";
import Select, { IOption } from "../../../components/select/select";
import Button from "../../../components/button/button";
import { useNavigate } from "@reach/router";
import validationRules from "../../../utils/validationRule";
import populateCreateFormFields from "../../../constants/populateCreateFormFields";
import Calendar from "react-calendar";
import DataPicker from "../../../components/data-picker/data-picker";
import Autocomplete from "../../../components/autocomplate/autocomplete";

interface IClientCreate {
    path: string;
}


const ClientCreate: React.FC<IClientCreate> = () => {
    const crudKey = "clients";
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const fields: Array<IItem> = [
        ///  { name: "date_of_service", type: "datepicker", label: "date_of_service" },
        { name: "trip_id", type: "select", label: "trip_type" },
        { name: "fullName", type: "input", label: "fullName" },
        { name: "gender", type: "select", label: "gender" },
        { name: "birthday", type: "datepicker", label: "birthday" },

        { name: "los", type: "select", label: "los" },
        { name: "artificial", type: "select", label: "artificial" },
        { name: "waitDuration", type: "select", label: "waitDuration" },
        { name: "vendors", type: "select", label: "vendors" },

        { name: "request_type", type: "select", label: "request_type" },

        { name: "member_uniqie_identifer", type: "input", label: "member_uniqie_identifer" },

        /// { name: "status", type: "select", label: "status" },
        { name: "origin_phone", type: "input", label: "origin_phone", inputType: "tel" },
        { name: "destination_phone", type: "input", label: "destination_phone", inputType: "tel" },
        { name: "price", type: "input", label: "price", inputType: "number" },
        { name: "origin_comment", type: "textarea", label: "origin_comment" },
        { name: "destination_comments", type: "textarea", label: "destination_comments" },
        /// { name: "location", type: "autocomplete", label: "location" },

        // { name: "id", type: "hidden", inputType: "hidden" },
        { name: "height", type: "input", label: "height", inputType: "number" },
        { name: "weight", type: "input", label: "weight", inputType: "number" },
        { name: "miles", type: "input", label: "miles", inputType: "disabled" }

        //   { name: "pick_up", type: "timePicker", label: "pick_up" },
        ///  { name: "drop_down", type: "timePicker", label: "drop_down" }

    ];

    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.createItem(crudKey);

                setData(data);
            }
        )();

    }, []);

    const requiredFields = [
        "fullName"
    ];

    const { t } = useTranslation();

    const navigate = useNavigate();
    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);

    const submit = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        formData.append("value", JSON.stringify(values));
        const res: any = await AdminApi.store(formData, crudKey, true);
        if (Number(res.status === 200)) await navigate(`/admin/${crudKey}`);
    };


    const loadTripPeriod = async (id: number) => {
        if (id === 1) {
            setShow(false);
            return data["daysOnWeek"];
        } else {
            fields[0]["type"] = "hidden";
            setShow(true);
            return data["daysOnWeek"];
        }

    };

    const loadStatus = async () => {
        // console.log(make, "aaa");
        return data["clientType"];


    };

    const handleDrawMap = async () => {


    };
    return data && <div>

        <Formik
            selectOptions={data}
            initialValues={populateCreateFormFields(fields, data)}
            onSubmit={submit}
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
                console.log(values);
                return (
                    <>
                        {
                            <div className={s.autocomplete}>
                                <Autocomplete
                                    setFieldValue={setFieldValue}
                                    handleDrawMap={handleDrawMap}
                                    values={values}
                                    name={"asdsd"}
                                    handleChange={handleChange}
                                />
                            </div>
                        }
                        <form className={s.form}>

                            <div className={s.item}>
                                {
                                    <AsyncSelect
                                        loadOptions={loadStatus}
                                        defaultValue={values["clientType"]}
                                        getOptionValue={(option: IOption) => option.value}
                                        getOptionLabel={(option: IOption) => t(option.label)}
                                        ///
                                        options={data ? data["clientType"] : data}
                                        /// options={selectOptions}
                                        onChange={(option: IOption) => {
                                            setFieldValue("clientType", option);
                                            loadTripPeriod(option.id);
                                        }}
                                        label={null}
                                        isSearchable={false}
                                        name={"clientType"}
                                        placeholder={"Trip type"}
                                    />
                                }
                            </div>

                            {show &&
                                <>
                                    <div className={s.item}>
                                        <Select
                                            value={values["daysOnWeek"]}
                                            getOptionValue={(option: IOption) => option.value}
                                            getOptionLabel={(option: IOption) => option.label}
                                            ///
                                            options={data["daysOnWeek"]}
                                            isMulti
                                            onChange={(option: IOption) => setFieldValue("daysOnWeek", option)}
                                            label={"daysOnWeek"}
                                            isSearchable={false}
                                            name={"daysOnWeek"}
                                            placeholder={"daysOnWeek"}
                                        />
                                    </div>
                                    <div className={s.item}>
                                        <Calendar
                                            formats="MM-dd-yyyy"
                                            selected={new Date().toLocaleDateString()}
                                            /// className={s.dataPicker}
                                            selectRange={true}
                                            onKeyDown={(e: any) => {
                                                e.preventDefault();
                                            }}
                                            onChange={(date: any) => {
                                                console.log(date);
                                                setFieldValue("range", date);
                                                ////  setShow(!show);
                                            }}
                                        />
                                    </div>

                                </>
                            }


                            {!show && <div className={s.item}>
                                {/* {errors[item.name] && <div >{errors[item.name] }</div>} */}

                                <DataPicker
                                    name={"date_of_service"}
                                    value={values["date_of_service"]}
                                    selectRange={false}
                                    /// className={`${s.input}`}
                                    ///  placeholder={null}
                                    /// placeholder={getFieldLabel(t, "date_of_service", "date_of_service", requiredFields)}
                                    // error={errors['date_of_service']}
                                    // type={"string"}
                                    setFieldValue={setFieldValue} />
                            </div>}
                            {
                                fields
                                    .map((field, index) => {
                                            if (data && data[field.name]) {
                                                return <div key={index} className={s.item}>
                                                    <FormikHandler
                                                        item={field}
                                                        className={s.item}
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
                                                        className={s.item}
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

    </div>;
    //     <Create
    //     crudKey={crudKey}
    //     data={data}
    //     requiredFields={requiredFields}
    //     fields={fields}
    //     title={''}
    //     children={t('create')}
    // />

};

export default ClientCreate;
