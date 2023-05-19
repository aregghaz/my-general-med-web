import React, { useEffect, useState } from "react";
import FormikHandler, { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";
import s from "../../vendor/cars/car.module.scss";
import Autocomplete from "../../../components/autocomplate/autocomplete";
import { Formik, FormikHelpers } from "formik";
import { FormikValues } from "formik/dist/types";
import Button from "../../../components/button/button";
import populateEditFormFields from "../../../constants/populateEditFormFields";
import validationRules from "../../../utils/validationRule";
import { toast } from "react-toastify";
import InputCurrency from "../../../components/inputCurrency/inputcurrency";
import getFieldLabel from "../../../utils/getFieldLabel";
import { navigate } from "@reach/router";

interface IClientEditItem {
    path: string;
    id?: number;
}

const ClientEdit: React.FC<IClientEditItem> = ({ id }) => {
    const { t } = useTranslation();
    const crudKey = "clients";
    const [data, setData] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [steps, setSteps] = useState<Array<any>>([]);
    const [checked, setChecked] = useState(false);
    // const {isLoaded} = useJsApiLoader({
    //     googleMapsApiKey: GOOGLE_API_KEY,
    //     libraries: ["geometry", "drawing", "places"]
    // });
    const fields: Array<IItem> = [
        { name: "fullName", type: "input", label: "fullName" },
        { name: "member_uniqie_identifer", type: "input", label: "member_uniqie_identifer" },
        { name: "insurance", type: "file", label: "insurance"},
        { name: "gender", type: "select", label: "gender" },
        { name: "birthday", type: "datepicker", label: "birthday" },
        { name: "los", type: "select", label: "los", allowValueClear:false},
        { name: "date_of_service", type: "datepicker", label: "date_of_service" },
        { name: "vendor_id", type: "select", label: "vendors" },
        { name: "artificial_id", type: "select", label: "artificial" },
        { name: "duration_id", type: "select", label: "waitDuration" },
        { name: "stairchair_id", type: "select", label: "stairchair"},
        { name: "request_type", type: "select", label: "request_type" },
      ///  { name: "price", type: "input", label: "price", inputType: "number" },
        { name: "height", type: "input", label: "height" },
        { name: "weight", type: "input", label: "weight", inputType: "number" },
        { name: "miles", type: "input", label: "miles", inputType: "disabled" },
     //   { name: "duration", type: "input", label: "duration", inputType: "disabled" },
        { name: "address", type: "address", label: "" },
        { name: "stops", type: "hidden", label: "stops" },
        { name: "count", type: "hidden", label: "count" },

    ];


    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getUserData(crudKey, id);
                // console.log(data)

                ///TODO FIX THIS PART FOR ALL PAGESS
                setData(data);

            }
        )();

    }, []);
    const requiredFields = [
        // 'make',
        // 'model',
        // 'year',
        "fullName"
        // 'inspection',
        // 'insurance',
        // 'liability',
    ];
    const handlerCheckbox = () => {
        setChecked(!checked);
    };

    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);

    const submit = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        formData.append("_method", "put");
        formData.append("insurance", values["insurance"]);
        formData.append("value", JSON.stringify(values));
        const res: any = await AdminApi.update(formData, `admin/${crudKey}`, id);
        if (Number(res.status === 200)) {
            const options = {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT
            };

            toast(t("record_successfully_edited"), options);
          await navigate(`/admin/trips`);
        }
    };
    return data && <div>

        <Formik
            initialValues={populateEditFormFields(fields, data)}
            onSubmit={submit}
            validate={validate}
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
                                    values={values}
                                    name={"address"}
                                    requiredFields={requiredFields}
                                    handleChange={handleChange}
                                />
                            </div>
                        }
                        <form className={s.form}>
                            <div className={s.item}>
                                {
                                    <div className={s.fixedPriceWrapper} style={{
                                        // borderBottom: errors["price"] && !priceValue ? "none" : "",
                                        // paddingBottom: !checked && 10
                                    }}>
                                        <input
                                            className={s.fixedCheckbox}
                                            type={"checkbox"}
                                            id={"priceCheckbox"}
                                            onChange={() => {
                                                setFieldValue("specialPrice", !checked)
                                                handlerCheckbox()
                                            }}
                                        />
                                        {!checked && <label htmlFor={"priceCheckbox"}>Fix price</label>}

                                        <div className={s.fixedInputWrapper}>
                                            {/*{checked && <Input name={"price"} type={"number"}*/}
                                            {/*                   value={values["price"]}*/}
                                            {/*                   label={"Fix price"} onChange={handleChange} placeholder={"Fixed Price"}/>}*/}
                                            {checked && <>
                                                <InputCurrency
                                                    type={"number"}
                                                    name={"price"}
                                                    label={getFieldLabel(t,"Fix price","price",requiredFields)}
                                                    placeholder={"Fix price"}
                                                    setFieldValue={setFieldValue}
                                                    className={s.fixedInput}
                                                    error={errors["price"]}
                                                    // onValueChange={(values:any) => {
                                                    //     setPriceValue(values.float)
                                                    // }}
                                                />
                                            </>}
                                        </div>
                                    </div>
                                }
                            </div>
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
};

export default ClientEdit;
